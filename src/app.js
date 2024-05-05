// Package Requirements:
require("dotenv").config();
const express = require("express");
// Custom Utils:
// Enviroment Variables:
const port = process.env.BE_PORT;
// Initialize Application:
const app = express();
// Application Use:
//
app.get("/", (req, res) => {
  return res.status(200).json({
    code: 1,
    message: "Default branch",
  });
});

app.listen(port, () => {
  console.log(`> Website is running at http://localhost:${port}`);
});
