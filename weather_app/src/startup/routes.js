const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const weather = require('../routes/weather');
const views = require('../routes/views');
const notfound = require('../routes/notfound');
// eslint-disable-next-line import/no-commonjs
module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/', views);
  app.use('/weather/api', weather);
  app.use('/*', notfound);
};
