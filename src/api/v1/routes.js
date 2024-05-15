// Package Requirements:
const router = require("express").Router();
// Custom Utils (Requirements):
const { limit100Req15Min } = require("../../utils/requestLimiter");
// Custom Middlewares:
// Connect to Databases:
// Routers:
/* Emails Router: /api/v1/emails/... */
const EmailsRouter = require("./Emails/EmailsRouter");
router.use("/emails", limit100Req15Min, EmailsRouter);
// Exports:
module.exports = router;
