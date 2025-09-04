import './App.css';
import React, { useState } from 'react';


const API = process.env.REACT_APP_API_BASE;

function App() {
  const [email, setEmail] = useState('');
const [msg, setMsg] = useState('');

const subscribe = async (e) => {
e.preventDefault();
try {
const r = await fetch(${API}/subscribe, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email })
});
const j = await r.json();
setMsg(r.ok ? 'Subscribed!' : j.error || 'Failed');
} catch (e) {
setMsg(e.message);
}
};

const preview = async () => {
try {
const r = await fetch(${API}/updates?limit=5);
const j = await r.json();
setMsg(j.text || j.error || 'No data');
} catch (e) {
setMsg(e.message);
}
};

const sendNow = async () => {
try {
const r = await fetch(${API}/send, { method: 'POST' });
const j = await r.json();
setMsg(j.sent ? Sent to ${j.sent} : j.error || 'Failed');
} catch (e) {
setMsg(e.message);
}
};

return (
<main style={{ maxWidth: 480, margin: '4rem auto', fontFamily: 'system-ui' }}>
<h1>Subscribe</h1>
<form onSubmit={subscribe}>
<input
type="email"
required
placeholder="email@example.com"
value={email}
onChange={e => setEmail(e.target.value)}
style={{ padding: 8, width: '100%', border: '1px solid #ccc' }}
/>
<button type="submit" style={{ marginTop: 12, padding: '8px 16px' }}>
Sign up
</button>
</form>

text
  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
    <button type="button" onClick={preview}>Preview updates</button>
    <button type="button" onClick={sendNow}>Send email</button>
  </div>

  <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{msg}</pre>
</main>
);
}

export default App;
