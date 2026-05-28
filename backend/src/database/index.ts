import { connect } from "mongoose";

export const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in environment variables");
  await connect(uri);
  console.log("database connected");
};
