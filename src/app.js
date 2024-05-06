// Package Requirements:
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const chalk = require("chalk");
// Custom Utils (Requirements):
// Enviroment Variables:
const port = process.env.BE_PORT || 8080;
// Initialize NodeJS ExpressJS Application:
const app = express();
// Application Use:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// Default Routers:
app.get("/", (req, res) => {
  return res.status(200).json({
    code: 1,
    message: "Default branch",
  });
});
// API Routers:
// Default Error Handling:
// Initialize Server:
app.listen(port, () => {
  console.log(`> Website is running at http://localhost:${port}`);
});
