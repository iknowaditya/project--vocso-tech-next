export default function handler(req, res) {
  res.json({
    auth0BaseUrl: process.env.AUTH0_BASE_URL,
  });
}
