import { useState, useEffect } from "react";
import { getPrediction } from "../services/mlApi";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [remedy, setRemedy] = useState(null);
  const [, setProfile] = useState(null);
  const email = localStorage.getItem("userEmail") || "User";

  const triggerNotification = (result) => {
    const message =
      result.severity === "HIGH"
        ? `⚠️ High severity: ${result.disease} (${result.crop})`
        : `✅ Scan done: ${result.crop} - ${result.disease}`;
    const existing = JSON.parse(localStorage.getItem("notifications")) || [];
    localStorage.setItem(
      "notifications",
      JSON.stringify([{ id: Date.now(), message, time: new Date().toLocaleString(), read: false, severity: result.severity }, ...existing])
    );
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/upload/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistory(Array.isArray(data.uploads) ? data.uploads : []);
    } catch (err) {
      console.error("History fetch failed", err);
    }
  };

  const fetchRemedy = async (disease) => {
    try {
      const res = await fetch(`http://localhost:8080/api/remedies/${encodeURIComponent(disease)}`);
      const data = await res.json();
      setRemedy(data);
    } catch (err) {
      console.error("Remedy fetch error", err);
    }
  };

  const analyzeCrop = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // 1. Get prediction from ML service
      const result = await getPrediction(image);
      setPrediction(result);
      triggerNotification(result);
      fetchRemedy(result.disease);

      // 2. Save scan + prediction data to backend (MongoDB)
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("crop", result.crop || "");
      formData.append("disease", result.disease || "");
      formData.append("severity", result.severity || "");
      formData.append("confidence", result.confidence || "");

      const uploadRes = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        console.error("❌ Upload to backend failed:", uploadData);
      } else {
        console.log("✅ Scan saved to backend:", uploadData);
      }

      fetchHistory();
    } catch (err) {
      console.error("❌ analyzeCrop error:", err);
      alert("Prediction failed. Check ML service.");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setProfile(data);
    } catch (err) {
      console.error("Profile fetch failed", err);
    }
  };

  useEffect(() => { fetchHistory(); fetchProfile(); }, []);

  return (
    <div className="ud-page">

      {/* Welcome Banner */}
      <div className="ud-banner">
        <div>
          <h2>Welcome back 👋</h2>
          <p>{email}</p>
        </div>
        <div className="ud-banner-icon">🌿</div>
      </div>

      {/* Upload + Result */}
      <div className="ud-grid">

        {/* Upload Card */}
        <div className="ud-card">
          <h3>📷 Upload Crop Image</h3>

          <label className="ud-upload-label">
            {preview
              ? <img src={preview} alt="preview" className="ud-preview" />
              : <div className="ud-upload-placeholder">
                  <span>🖼️</span>
                  <p>Click to select image</p>
                </div>
            }
            <input type="file" accept="image/*" onChange={handleFile} hidden />
          </label>

          <button
            className="ud-btn"
            onClick={analyzeCrop}
            disabled={!image || loading}
          >
            {loading ? "🔄 Analyzing..." : "Analyze Crop"}
          </button>
        </div>

        {/* Result Card */}
        <div className="ud-card">
          <h3>🌾 Prediction Result</h3>
          {prediction ? (
            <div className="ud-result">
              <div className="ud-result-row"><span>Crop</span><strong>{prediction.crop}</strong></div>
              <div className="ud-result-row"><span>Disease</span><strong>{prediction.disease}</strong></div>
              <div className={`ud-result-row ud-severity-${prediction.severity?.toLowerCase()}`}>
                <span>Severity</span><strong>{prediction.severity}</strong>
              </div>
              <div className="ud-result-row"><span>Confidence</span><strong>{prediction.confidence}%</strong></div>
            </div>
          ) : (
            <div className="ud-empty">Upload an image and click Analyze to see results</div>
          )}
        </div>

      </div>

      {/* Remedy */}
      {remedy && (
        <div className="ud-card ud-remedy">
          <h3>💊 Recommended Remedy</h3>
          <div className="ud-remedy-grid">
            <div><label>Disease</label><p>{remedy.disease}</p></div>
            <div><label>Remedy</label><p>{remedy.remedy}</p></div>
            <div><label>Prevention</label><p>{remedy.prevention}</p></div>
            <div><label>Organic Pesticide</label><p>{remedy.organicPesticide}</p></div>
            <div><label>How to Use</label><p>{remedy.howToUse}</p></div>
          </div>
        </div>
      )}

      {/* History */}
      <div className="ud-card">
        <h3>🕒 Scan History</h3>
        {history.length === 0 ? (
          <div className="ud-empty">No scans yet. Upload your first image above.</div>
        ) : (
          <div className="ud-history-grid">
            {history.map((item, i) => (
              <div key={i} className="ud-history-item">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt="scan" className="ud-history-img" />
                )}
                <div className="ud-history-info">
                  <p className="ud-history-name">{item.imageName}</p>
                  {item.crop && <p className="ud-history-meta">{item.crop} — {item.disease}</p>}
                  {item.severity && <p className={`ud-history-sev ud-severity-${item.severity?.toLowerCase()}`}>{item.severity}</p>}
                  <p className="ud-history-date">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default UserDashboard;
