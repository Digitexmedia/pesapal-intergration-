// pages/api/callback.js
export default function handler(req, res) {
  console.log('PesaPal Callback:', req.query); // You can log or verify here
  res.status(200).send('Payment complete. You may close this window.');
}
