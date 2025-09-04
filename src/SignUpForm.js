import React, { useState } from "react";
import "./SignupForm.css"; 

function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const backend = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch(`${backend}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (res.ok) {
        setStatus("Thanks — we saved your email!");
        setEmail("");
      } else {
        setStatus(j.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("Network error");
    }
  }

  return (
    <div className="signup-container">
      <h2 className="title">Get GitHub timeline updates</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button type="submit" className="submit-btn">
          Subscribe
        </button>
      </form>
      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default SignupForm;
