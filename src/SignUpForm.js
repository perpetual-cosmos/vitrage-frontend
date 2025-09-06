import React, { useState } from "react";
import "./SignupForm.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState([]);

  const backend = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  // Function to save email
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await fetch(`${backend}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (res.ok) {
        setStatus("Thanks! We saved your email.");
      } else {
        setStatus((j.error || "Something went wrong"));
      }
    } catch {
      setStatus("Network error");
    }
  }

  // Load github events
  async function loadEvents() {
    setStatus("Fetching github events...");
    try {
      const res = await fetch(`${backend}/api/events`);
      const j = await res.json();
      if (j.ok) {
        setEvents(j.raw);
        setStatus("Latest github events loaded!");
      } else {
        setStatus("Failed to fetch events");
      }
    } catch {
      setStatus("Network error");
    }
  }

  // Send email
  async function sendNow() {
    setStatus("Sending update to your inbox...");
    try {
      const res = await fetch(`${backend}/api/send-to-me`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (res.ok) {
        setStatus("Email sent successfully! Check your inbox.");
      } else {
        setStatus((j.error || "Something went wrong"));
      }
    } catch {
      setStatus("Network error");
    }
  }

  return (
    <div className="card">
      <h2>GitHub Timeline Updates</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>

      <div className="actions">
        <button onClick={loadEvents}>Show Latest Events</button>
        <button onClick={sendNow} disabled={!email}>
          Send Me Updates
        </button>
      </div>

      {status && <div className="status">{status}</div>}

      {events.length > 0 && (
        <ul className="events">
          {events.map((e, i) => (
            <li key={i}>
              <strong>{e.type}</strong> — {e.repo?.name} by{" "}
              {e.actor?.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SignupForm;
