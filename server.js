const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Ziy AI server is running 🤖");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: message
    });

    res.json({
      text: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ziy AI could not answer"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ziy AI running on port ${PORT}`);
});
