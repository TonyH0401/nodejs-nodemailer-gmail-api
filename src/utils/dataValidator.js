// Package Requirements:
const validator = require("validator");
// Custom Utils (Requirements):
// Constant Declarations:
// Data Validators:
/* validate array of email addresses */
/**
 * @param {string[]} emailArray - An array of email addresses to be validated.
 * @returns {boolean} - Returns true if all email addresses are valid, otherwise returns false.
 */
function validateEmails(emailArray) {
  return emailArray.every((email) => validator.isEmail(email));
}
// Exports:
module.exports = { validateEmails };
