const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
});

app.listen(3001, () => {
  console.log("Node server running on http://localhost:3001");
});