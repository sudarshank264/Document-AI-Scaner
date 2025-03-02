const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.json({ response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating response", details: error.message });
  }
});

module.exports = router;
