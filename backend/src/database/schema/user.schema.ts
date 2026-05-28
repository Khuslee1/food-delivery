import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String, required: false },
    address: { type: String, required: false },
    role: { type: String, required: true, default: "customer" },
    resetOTP: { type: String, required: false },
    resetOTPExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
