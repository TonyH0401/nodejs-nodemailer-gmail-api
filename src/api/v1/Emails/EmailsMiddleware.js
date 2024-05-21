// Package Requirements:
const createError = require("http-errors");
const path = require("path");
const nodemailer = require("nodemailer");
// Custom Utils (Requirements):
const { validateEmails } = require("../../../utils/dataValidator");
// Custom Middlewares:
// Constant Declarations:
const gmailhost = process.env.GMAILHOST || "";
const gmailuser = process.env.GMAILUSER || "";
const apppassword = process.env.APPPASSWORD || "";
// Import Models:
// Emails Middlewares:
/* email credentials checker */
module.exports.emailCredentialCheck = async (req, res, next) => {
  try {
    if (!gmailhost) return next(createError(400, "Email Host Not Found ⚠️!"));
    if (!gmailuser) return next(createError(400, "Email User Not Found ⚠️!"));
    if (!apppassword)
      return next(createError(400, "Email Authentication Not Found ⚠️!"));
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
};
/* email input info checker */
module.exports.emailInfoCheck = async (req, res, next) => {
  const { emailReceiver, emailSubject, emailText, emailCC, emailBCC } =
    req.body;
  try {
    if (!emailReceiver) {
      return next(createError(404, "There are no receivers!"));
    } else {
      if (emailReceiver.length == 0) {
        return next(createError(404, "There are no email addresses!"));
      } else {
        if (!validateEmails(emailReceiver)) {
          return next(createError(404, "Invalid receiver email addresses!"));
        }
      }
    }
    if (!emailSubject)
      return next(createError(404, "Email must have a subject!"));
    if (!emailText)
      return next(createError(404, "Email must contain sontent!"));
    if (emailCC) {
      if (emailCC.length == 0) {
        return next(createError(404, "There are no CC email addresses!"));
      } else {
        if (!validateEmails(emailCC)) {
          return next(createError(404, "Invalid CC addresses!"));
        }
      }
    }
    if (emailBCC) {
      if (emailBCC.length == 0) {
        return next(createError(404, "There are no BCC email addresses!"));
      } else {
        if (!validateEmails(emailBCC)) {
          return next(createError(404, "Invalid BCC addresses!"));
        }
      }
    }
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
};
/* send email */
module.exports.sendEmail = async (req, res, next) => {
  const {
    emailReceiver,
    emailCC,
    emailBCC,
    emailSubject,
    emailText,
    htmlContent,
  } = req.body;
  try {
    /* prepare the email transporter */
    const transporter = nodemailer.createTransport({
      host: gmailhost,
      port: 465,
      secure: true,
      auth: {
        user: gmailuser,
        pass: apppassword,
      },
      attachDataUrls: true,
    });
    /* prepare the email info */
    let info = {
      from: gmailuser,
      to: emailReceiver,
      cc: emailCC,
      bcc: emailBCC,
      subject: emailSubject,
      text: emailText,
      html: htmlContent,
    };
    /* sending the email info using async/await */
    const result = await transporter.sendMail(info);
    /* return success result */
    return res.status(200).json({
      code: 1,
      success: true,
      message: "Email is Sent ✔️!",
      data: {
        messageId: result.messageId,
        messagePreview: nodemailer.getTestMessageUrl(result),
      },
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
