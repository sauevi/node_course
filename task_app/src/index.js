const app = require('./startup/app');
const { logger } = require('./logger/logger');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`App runing on port: ${port}`);
});
