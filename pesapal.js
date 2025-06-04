// pages/api/pesapal.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email, amount } = req.body;

  const consumer_key = process.env.PESAPAL_CONSUMER_KEY;
  const consumer_secret = process.env.PESAPAL_CONSUMER_SECRET;
  const callback_url = process.env.PESAPAL_CALLBACK_URL;

  try {
    // Get access token
    const tokenResponse = await axios.get('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      headers: {
        Authorization: `Basic ${Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64')}`,
      },
    });

    const token = tokenResponse.data.token;

    // Create order
    const order = {
      id: `ORDER-${Date.now()}`,
      currency: 'KES',
      amount,
      description: 'PesaPal Payment',
      callback_url,
      billing_address: {
        email_address: email,
        phone_number: '',
        country_code: 'KE',
        first_name: 'Customer',
        last_name: 'PesaPal',
        line_1: 'Online',
        city: 'Nairobi',
        state: '',
        postal_code: '',
      },
    };

    const orderRes = await axios.post(
      'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',
      order,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.status(200).json({ url: orderRes.data.redirect_url });
  } catch (error) {
    console.error('PesaPal error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create PesaPal payment request.' });
  }
}
