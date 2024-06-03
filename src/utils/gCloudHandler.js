// Package Requirements:
const { google } = require("googleapis");
// Custom Utils (Requirements):
// Constant Declarations:
// Google Cloud Providers:
/* generate gmail access token */
async function generateGmailAccessToken(
  clientId,
  clientSecret,
  redirectUri,
  refreshToken
) {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  return await oAuth2Client.getAccessToken();
}
// Exports:
module.exports = { generateGmailAccessToken };
