// Package Requirements:
const router = require("express").Router();
const createError = require("http-errors");
// Custom Utils (Requirements):
// Custom Middlewares:
const {
  emailCredentialCheck,
  emailInfoCheck,
  sendEmail,
  sendEmailEthereal,
} = require("./EmailsMiddleware");
// Emails Routers:
/* send email */
router
  .route("/send-email")
  .post(emailCredentialCheck, emailInfoCheck, sendEmail);
/* send email using ethereal server */
router
  .route("/send-email-ethereal")
  .post(emailCredentialCheck, emailInfoCheck, sendEmailEthereal);
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
