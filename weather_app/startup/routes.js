const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const weather = require('../routes/weather');
// eslint-disable-next-line import/no-commonjs
module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api/weather', weather);
};
