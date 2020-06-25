const lodash = require('lodash');
const { saveUser } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');
const MailBuilder = require('../../mail/mailBuilder');
const sendMail = require('../../mail/sendmail');

const createUserGreetingsMail = (user) => {
  const mail = new MailBuilder('saulvillamizar.sv@gmail.com', user.getEmail())
    .setSubject('Greetings From Task App')
    .setText(`Hello ${user.getName()}, welcome to our task app`)
    .build();

  sendMail(mail);
};

const registrarUser = async (body) => {
  const newUser = await saveUser(body);

  if (!lodash.isEmpty(newUser)) {
    createUserGreetingsMail(newUser);
  }

  return responseUser(newUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = registrarUser;
