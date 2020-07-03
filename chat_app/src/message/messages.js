const Message = require('./Message');
const LocationMessage = require('./LocationMessage');
// eslint-disable-next-line import/no-commonjs
module.exports = (type, element) => {
  let message;
  if (type === 'Message') {
    message = new Message(element);
  }

  if (type === 'LocationMessage') {
    message = new LocationMessage(element);
  }

  return message;
};
