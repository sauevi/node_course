const express = require('express');
const handler = require('../middleware/handler');
const { getLocation } = require('../service/location/locationModel');
const { getLocationWeather } = require('../service/weather/weatherModel');

const router = express.Router();

/**
 * * Get the weather for a location
 */
router.get(
  '/:city',
  handler(async (req, res) => {
    const { city } = req.params;
    const location = await getLocation(city);
    const locationWeather = await getLocationWeather(location);
    res.send(locationWeather);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
