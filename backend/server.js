const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Email transporter setup (using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Endpoint to receive token from frontend
app.post("/auth/callback", async (req, res) => {
  const { token, email } = req.body;

  console.log("Request received:", { token, email });
  // Verify token with Auth0 (basic check)
  try {
    jwt.decode(token); // Simple decode (for demo; use Auth0's full verification in production)

    // Send email with token
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your Authentication Token",
      text: `Here is your token: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Token received and email sent" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
