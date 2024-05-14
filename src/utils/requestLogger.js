// Package Requirements:
const morgan = require("morgan");
// Request Logger Modes:
const reqLoggerTiny = morgan("tiny ");
const reqLoggerDev = morgan("dev");
/* this mode accepts error request only, they are requests that have a code above 400. */
const reqLoggerDevErr = morgan("dev", {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
/* this mode returns method, url, status and response time it is custome made. */
const reqLoggerCustom1 = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
// Exports:
module.exports = {
  reqLoggerTiny,
  reqLoggerDev,
  reqLoggerDevErr,
  reqLoggerCustom1,
};
