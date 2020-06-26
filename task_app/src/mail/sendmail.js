const sgMail = require('@sendgrid/mail');
const { logger } = require('../logger/logger');

// eslint-disable-next-line operator-linebreak
const sendgridApiKey =
  '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';
// eslint-disable-next-line import/no-commonjs
module.exports = async (mail) => {
  sgMail.setApiKey(sendgridApiKey);
  sgMail.send(mail).catch((err) => logger.error(err));
};
