const sgMail = require('@sendgrid/mail');
const { logger } = require('../logger/logger');

// eslint-disable-next-line operator-linebreak
const sendgridApiKey = process.env.APIKEY_MAIL;
// eslint-disable-next-line import/no-commonjs
module.exports = async (mail) => {
  sgMail.setApiKey(sendgridApiKey);
  sgMail.send(mail).catch((err) => logger.error(err));
};
