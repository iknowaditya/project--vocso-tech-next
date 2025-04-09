import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      scope: "openid profile email",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
