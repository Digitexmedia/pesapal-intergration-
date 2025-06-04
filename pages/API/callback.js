export default function handler(req, res) {
  console.log('PesaPal callback data:', req.query);
  res.status(200).send("PesaPal payment response received!");
}
