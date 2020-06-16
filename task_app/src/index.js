const express = require('express');
const bodyParser = require('body-parser');
const { logger } = require('./logger/logger');
const userController = require('./user/infrastructure/userController');

const port = process.env.PORT || 3000;
const app = express();
// Connection url
const host = 'mongodb://localhost:27017/task_app_test';
require('./db')(host);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userController);

app.listen(port, () => logger.info(`App runing on port: ${port}`));
