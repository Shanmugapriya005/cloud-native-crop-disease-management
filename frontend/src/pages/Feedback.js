import { useState } from "react";

function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {
    if (!message.trim()) { setMsg("Please enter your feedback."); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: message.trim(), rating: Number(rating) }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.message || "Failed to submit."); return; }
      setMsg("✅ Feedback submitted successfully!");
      setMessage("");
      setRating(5);
    } catch {
      setMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💬 Share Your Feedback</h2>
        <p style={styles.sub}>Help us improve CropCare with your thoughts.</p>

        <label style={styles.label}>Your Message</label>
        <textarea
          style={styles.textarea}
          placeholder="Write your feedback here..."
          value={message}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label style={styles.label}>Rating</label>
        <div style={styles.stars}>
          {[1,2,3,4,5].map((s) => (
            <span
              key={s}
              onClick={() => setRating(s)}
              style={{ fontSize: 28, cursor: "pointer", color: s <= rating ? "#f59e0b" : "#d1d5db" }}
            >★</span>
          ))}
        </div>

        {msg && <p style={{ color: msg.startsWith("✅") ? "#16a34a" : "#dc2626", fontSize: 14, margin: "10px 0" }}>{msg}</p>}

        <button style={styles.btn} onClick={submitFeedback} disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "40px 28px", background: "#f8fafc", minHeight: "100vh" },
  card: {
    background: "white", borderRadius: 16, padding: "32px",
    maxWidth: 560, boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  title: { fontSize: 22, fontWeight: 700, color: "#1f2937", margin: "0 0 6px" },
  sub: { fontSize: 14, color: "#6b7280", margin: "0 0 24px" },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 },
  textarea: {
    width: "100%", padding: "12px", borderRadius: 10,
    border: "1px solid #e5e7eb", fontSize: 14, resize: "vertical",
    outline: "none", marginBottom: 20, fontFamily: "inherit",
  },
  stars: { display: "flex", gap: 4, marginBottom: 20 },
  btn: {
    background: "#16a34a", color: "white", border: "none",
    padding: "11px 28px", borderRadius: 10, fontSize: 15,
    fontWeight: 600, cursor: "pointer", width: "100%",
  },
};

export default Feedback;
