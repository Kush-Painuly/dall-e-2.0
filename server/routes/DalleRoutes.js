import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  try {
    const ai_Response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = ai_Response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).json(error?.response?.data?.error?.message);
  }
});

router.route("/").get((req, res) => {
  res.send("Hello World");
});

export default router;
