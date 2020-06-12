const path = require('path');
const hbs = require('hbs');

const viewsDirPath = path.join(__dirname, '../../templates/views');
const partialsDirPath = path.join(__dirname, '../../templates/partials');
// eslint-disable-next-line import/no-commonjs
module.exports = (app) => {
  // set views
  app.set('view engine', 'html');
  app.set('views', viewsDirPath);
  // eslint-disable-next-line no-underscore-dangle
  app.engine('html', hbs.__express);
  hbs.registerPartials(partialsDirPath);
};
