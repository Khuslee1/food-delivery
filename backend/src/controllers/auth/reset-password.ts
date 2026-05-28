import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../../database/schema/user.schema";

export const resetPassword: RequestHandler = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "No account found with that email." });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  await UserModel.updateOne(
    { email },
    { $set: { password: hashed }, $unset: { resetOTP: 1, resetOTPExpiry: 1 } }
  );

  res.status(200).json({ message: "Password reset successful." });
};
