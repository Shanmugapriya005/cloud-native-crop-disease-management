import React, { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    setLoading(true);

    const response = await fetch("http://localhost:8080/api/predict", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
        // ❌ DO NOT add Content-Type manually
      }
    });

    const text = await response.text();
    console.log("Raw response:", text);

    if (!response.ok) {
      throw new Error(text);
    }

    const data = JSON.parse(text);

    setPrediction(data.prediction);
    setConfidence(data.confidence);

  } catch (error) {
    console.error("Upload error:", error);
    alert("Prediction failed. Check backend.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div>
      <h2>Crop Disease Detection</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <br /><br />npm start
      

      {prediction && (
        <div>
          <h3>Prediction: {prediction}</h3>
          <h4>Confidence: {confidence.toFixed(2)}%</h4>
        </div>
      )}
    </div>
  );
}

export default Upload;
