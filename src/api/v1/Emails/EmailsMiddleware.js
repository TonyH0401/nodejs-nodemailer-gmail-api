// Package Requirements:
const createError = require("http-errors");
const path = require("path");
// Custom Utils (Requirements):
// Custom Middlewares:
// Constant Declarations:
// Import Models:
// Emails Middlewares:
/*  */
module.exports.sendEmail = async (req, res, next) => {
  return res.status(200).json({
    code: 1,
  });
};
