import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
export default connectDB;
