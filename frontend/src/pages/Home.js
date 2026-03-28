import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: "🔬", title: "AI-Powered Detection", desc: "Upload a leaf image and get instant disease diagnosis powered by deep learning." },
    { icon: "💊", title: "Instant Remedies", desc: "Get organic and chemical treatment recommendations tailored to the detected disease." },
    { icon: "📊", title: "Scan History", desc: "Track all your past scans and monitor your crop health over time." },
    { icon: "⚡", title: "Fast & Accurate", desc: "Results in seconds with high confidence scores from our trained ML model." },
    { icon: "🍅", title: "Tomato Specialist", desc: "Specialized for tomato crops — covering all major tomato leaf diseases with high precision." },
    { icon: "🛡️", title: "Admin Control", desc: "Full admin panel to manage users, view all scans and monitor platform activity." },
  ];

  const steps = [
    { step: "01", title: "Sign Up", desc: "Create your free account in seconds." },
    { step: "02", title: "Upload Image", desc: "Take a photo of the affected leaf and upload it." },
    { step: "03", title: "Get Results", desc: "Our AI analyzes and returns the disease name, severity and confidence." },
    { step: "04", title: "Apply Remedy", desc: "Follow the recommended treatment to save your crop." },
  ];

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-nav-logo">🌿 CropCare</div>
        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <button className="home-nav-btn" onClick={() => navigate("/user/login")}>Login</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-hero-tag">🌱 AI-Powered Plant Health</span>
          <h1>Detect Crop Diseases<br /><span>Before They Spread</span></h1>
          <p>Upload a photo of your crop leaf and get instant disease diagnosis, severity assessment, and treatment recommendations — all in seconds.</p>
          <div className="home-hero-btns">
            <button className="home-btn-primary" onClick={() => navigate("/user/signup")}>Get Started Free</button>
            <button className="home-btn-outline" onClick={() => navigate("/admin/login")}>Admin Login</button>
          </div>
          <div className="home-hero-stats">
            <div><strong>10+</strong><span>Diseases Detected</span></div>
            <div className="home-stat-divider" />
            <div><strong>99%</strong><span>Accuracy Rate</span></div>
            <div className="home-stat-divider" />
            <div><strong>🍅</strong><span>Tomato Focused</span></div>
          </div>
        </div>
        <div className="home-hero-visual">
          <div className="home-hero-card">
            <div className="home-hero-card-header">
              <span className="home-hero-dot red" />
              <span className="home-hero-dot yellow" />
              <span className="home-hero-dot green" />
            </div>
            <div className="home-hero-card-body">
              <div className="home-scan-icon">🍃</div>
              <p className="home-scan-label">Analyzing leaf...</p>
              <div className="home-scan-bar"><div className="home-scan-fill" /></div>
              <div className="home-result-box">
                <div className="home-result-row"><span>Crop</span><strong>Tomato</strong></div>
                <div className="home-result-row"><span>Disease</span><strong>Yellow Leaf Curl</strong></div>
                <div className="home-result-row home-result-high"><span>Severity</span><strong>HIGH</strong></div>
                <div className="home-result-row"><span>Confidence</span><strong>99.9%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-section" id="features">
        <div className="home-section-label">Why CropCare</div>
        <h2 className="home-section-title">Everything you need to protect your crops</h2>
        <div className="home-features-grid">
          {features.map((f, i) => (
            <div className="home-feature-card" key={i}>
              <div className="home-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="home-section home-section-dark" id="how">
        <div className="home-section-label light">How It Works</div>
        <h2 className="home-section-title light">From photo to remedy in 4 steps</h2>
        <div className="home-steps">
          {steps.map((s, i) => (
            <div className="home-step" key={i}>
              <div className="home-step-num">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="home-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to protect your crops?</h2>
        <p>Join farmers already using CropCare to detect and treat plant diseases early.</p>
        <button className="home-btn-primary large" onClick={() => navigate("/user/signup")}>
          Start for Free →
        </button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <span>🌿 CropCare — AI Crop Disease Management</span>
        <span>© 2026 All rights reserved</span>
      </footer>

    </div>
  );
}

export default Home;
