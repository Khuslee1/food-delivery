import { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema";

export const verifyOTP: RequestHandler = async (req, res) => {
  const { email, otp } = req.body as { email: string; otp: string };

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "No account found with that email." });
    return;
  }

  if (user.resetOTP !== otp) {
    res.status(400).json({ message: "Invalid OTP." });
    return;
  }

  const expiry = user.resetOTPExpiry as Date | undefined;
  if (!expiry || expiry < new Date()) {
    res.status(400).json({ message: "OTP has expired. Please request a new one." });
    return;
  }

  res.status(200).json({ message: "OTP verified." });
};
