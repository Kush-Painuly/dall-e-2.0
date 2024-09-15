import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongoDB/connect.js";
import PostRoutes from "./routes/PostRoutes.js";
import DalleRoutes from "./routes/DalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E !!");
});

app.use("/api/v1/post", PostRoutes);
app.use("/api/v1/dalle", DalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
