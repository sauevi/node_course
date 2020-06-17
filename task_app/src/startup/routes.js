const bodyParser = require('body-parser');
const helmet = require('helmet');
const userController = require('../user/infrastructure/userController');
const taskController = require('../task/infrastructure/taskController');
// eslint-disable-next-line import/no-commonjs
module.exports = (app) => {
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/user', userController);
  app.use('/task', taskController);
};
