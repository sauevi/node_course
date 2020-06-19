const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userController = require('../user/infrastructure/userController');
const taskController = require('../task/infrastructure/taskController');
const logginController = require('../loggin/infrastructure/loggingController');
// eslint-disable-next-line import/no-commonjs
module.exports = (app) => {
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/user', userController);
  app.use('/task', taskController);
  app.use('/loggin', logginController);
};
