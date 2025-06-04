import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  const payNow = async () => {
    const res = await fetch('/api/pesapal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount }),
    });
    const data = await res.json();
    setIframeUrl(data.url);
  };

  return (
    <main style={{ padding: 40, fontFamily: 'Arial', backgroundColor: '#f4f4f4' }}>
      <h1>PesaPal Payment</h1>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="number"
        placeholder="Amount (KES)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      /><br /><br />
      <button onClick={payNow}>Pay Now</button>

      {iframeUrl && (
        <div style={{ marginTop: 20 }}>
          <iframe
            src={iframeUrl}
            width="100%"
            height="600"
            frameBorder="0"
            title="PesaPal Payment"
          ></iframe>
        </div>
      )}
    </main>
  );
                                }
