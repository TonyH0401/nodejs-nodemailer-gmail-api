// Package Requirements:
const router = require("express").Router();
const createError = require("http-errors");
// Custom Utils (Requirements):
// Custom Middlewares:
const {} = require("./EmailsMiddleware");
// Emails Routers:
/*  */
router.get("/", (req, res) => {
  return res.status(200).json({
    code: 1,
  });
}); 
// Emails Error Handling:
router
  .use((req, res, next) => {
    next(createError(404, "This /emails directory does not exist 🙅!"));
  })
  .use((err, req, res, next) => {
    let errorStatus = err.status || 404;
    let errorMessage = err.message || "";
    return res.status(errorStatus).json({
      code: 0,
      success: false,
      message: errorMessage,
    });
  });
// Exports:
module.exports = router;
