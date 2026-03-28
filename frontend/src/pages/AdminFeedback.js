import { useEffect, useState } from "react";

function AdminFeedback() {

  const [feedbacks, setFeedbacks] = useState([]);

  const loadFeedback = async () => {

    try {

      const res = await fetch("http://localhost:5001/api/feedback");

      const data = await res.json();

      setFeedbacks(data);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const deleteFeedback = async (id) => {

    await fetch(`http://localhost:5001/api/feedback/${id}`, {
      method: "DELETE"
    });

    loadFeedback();
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>📋 User Feedback</h2>

      {feedbacks.length === 0 && <p>No feedback yet</p>}

      {feedbacks.map((f) => (

        <div key={f._id}
          style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "6px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >

          <p><b>Message:</b> {f.message}</p>
          <p><b>Rating:</b> {"⭐".repeat(f.rating)}</p>

          <button
            onClick={() => deleteFeedback(f._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px"
            }}
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default AdminFeedback;