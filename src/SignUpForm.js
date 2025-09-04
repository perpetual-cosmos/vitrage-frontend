import React, { useState } from 'react';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const backend = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(`${backend}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (res.ok) {
        setStatus('Thanks — we saved your email!');
      } else {
        setStatus(j.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('Network error');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Get GitHub timeline updates</h2>
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button type="submit">Subscribe</button>
      <div style={{ marginTop: 8 }}>{status}</div>
    </form>
  );
}

export default SignupForm;
