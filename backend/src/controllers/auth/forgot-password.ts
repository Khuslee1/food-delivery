import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { UserModel } from "../../database/schema/user.schema";

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body as { email: string };

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "No account found with that email." });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await UserModel.updateOne({ email }, { $set: { resetOTP: otp, resetOTPExpiry: expiry } });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Food Delivery" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <p>Hi,</p>
      <p>Your OTP for resetting your password is:</p>
      <h2>${otp}</h2>
      <p>This code expires in <strong>10 minutes</strong>. If you did not request this, ignore this email.</p>
    `,
  });

  res.status(200).json({ message: "OTP sent to your email." });
};
