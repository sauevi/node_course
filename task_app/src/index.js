const express = require('express');
const { logger } = require('./logger/logger');

const port = process.env.PORT || 3000;

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: './env/dev.env' });

const app = express();
// Connection url
const host = process.env.DATABASE_URL;
require('./startup/db')(host);
require('./startup/routes')(app);

app.listen(port, () => logger.info(`App runing on port: ${port}`));
