import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
    });

    await transporter.sendMail({
      from: `"Waitlist" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // receive email here
      subject: "New Waitlist Signup",
      text: `New signup: ${email}`,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
