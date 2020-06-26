const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: './env/dev.env' });

const app = express();
// Connection url
const host = 'mongodb://localhost:27017/task_app_test';
require('./db')(host);
require('./routes')(app);

// eslint-disable-next-line import/no-commonjs
module.exports = app;
