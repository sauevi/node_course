const express = require('express');
const { logger } = require('./logger/logger');

const port = process.env.PORT || 3000;
const app = express();
// Connection url
const host = 'mongodb://localhost:27017/task_app_test';
require('./startup/db')(host);
require('./startup/routes')(app);

app.listen(port, () => logger.info(`App runing on port: ${port}`));
