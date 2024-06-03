// Package Requirements:
const createError = require("http-errors");
const path = require("path");
const nodemailer = require("nodemailer");
// Custom Utils (Requirements):
const { validateEmails } = require("../../../utils/dataValidator");
const { generateGmailAccessToken } = require("../../../utils/gCloudHandler");
// Custom Middlewares:
// Constant Declarations:
const gmailhost = process.env.GMAILHOST || "";
const gmailuser = process.env.GMAILUSER || "";
const apppassword = process.env.APPPASSWORD || "";
const etherealhost = process.env.ETHEREALHOST || "";
const clientId = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const redirectUri = process.env.GOOGLE_PLAYGROUND_REDIRECT_URI || "";
const refreshToken = process.env.GOOGLE_PLAYGROUND_REFRESH_TOKEN || "";
// Import Models:
// Emails Middlewares:
/* email credentials checker */
module.exports.emailCredentialCheck = async (req, res, next) => {
  try {
    if (!gmailhost) return next(createError(400, "Email Host Not Found ⚠️!"));
    if (!gmailuser) return next(createError(400, "Email User Not Found ⚠️!"));
    if (!apppassword)
      return next(createError(400, "Email Authentication Not Found ⚠️!"));
    if (!etherealhost)
      return next(createError(400, "Ethereal Host Not Found ⚠️!"));
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
};
/* email input info checker */
module.exports.emailInfoCheck = async (req, res, next) => {
  const {
    emailSender,
    emailReceiver,
    emailSubject,
    emailText,
    emailCC,
    emailBCC,
  } = req.body;
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
    if (emailSender) {
      if (emailSender.length == 1) {
        if (!validateEmails(emailSender)) {
          return next(createError(404, "Invalid sender address!"));
        }
      } else {
        return next(createError(404, "There is no valid sender address!"));
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
/* send email using ethereal server */
module.exports.sendEmailEthereal = async (req, res, next) => {
  const {
    emailSender,
    emailReceiver,
    emailCC,
    emailBCC,
    emailSubject,
    emailText,
    htmlContent,
  } = req.body;
  try {
    /* create test account */
    const testAccount = await nodemailer.createTestAccount();
    /* prepare the email transporter */
    const transporter = nodemailer.createTransport({
      host: etherealhost,
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      attachDataUrls: true,
    });
    /* prepare the email info */
    let info = {
      from: emailSender,
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
/* send email with embed image and file attachment */
module.exports.sendEmailEmbedAttachFile = async (req, res, next) => {
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
      attachments: [
        {
          filename: "white-kitty-cat.jpeg",
          path: "./public/white-kitty-cat.jpeg",
          cid: "unique@nodemailer.com",
        },
        {
          filename: "file.txt",
          path: "./public/file.txt",
        },
        {
          filename: "file2.txt",
          content: "This is raw input content",
        },
      ],
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
/* google (cloud) email credentialls checker */
module.exports.googleCredentialCheck = async (req, res, next) => {
  try {
    if (!gmailhost) return next(createError(400, "Email Host Not Found 🚨!"));
    if (!gmailuser) return next(createError(400, "Email User Not Found 🚨!"));
    if (!clientId) return next(createError(400, "Email Id Not Found 🚨!"));
    if (!clientSecret)
      return next(createError(400, "Email Credential Not Found 🚨!"));
    if (!redirectUri) return next(createError(400, "Host Url Not Found 🚨!"));
    if (!refreshToken)
      return next(createError(400, "Email Token Not Found 🚨!"));
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
};
/* send email using google api */
module.exports.sendEmailUsingGoogleApi = async (req, res, next) => {
  const {
    emailReceiver,
    emailCC,
    emailBCC,
    emailSubject,
    emailText,
    htmlContent,
  } = req.body;
  try {
    /* generate gmail access token */
    const accessToken = await generateGmailAccessToken(
      clientId,
      clientSecret,
      redirectUri,
      refreshToken
    );
    /* prepare the email transporter */
    const transporter = nodemailer.createTransport({
      host: gmailhost,
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: gmailuser,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
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
      attachments: [
        {
          filename: "white-kitty-cat.jpeg",
          path: "./public/white-kitty-cat.jpeg",
          cid: "unique@nodemailer.com",
        },
        {
          filename: "file.txt",
          path: "./public/file.txt",
        }, {
          filename: "fromgoogleapi.txt",
          content: "This was sent using Google API!"
        }
      ],
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
