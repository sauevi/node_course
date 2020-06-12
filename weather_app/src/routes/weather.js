const express = require('express');
const handler = require('../middleware/handler');
const validRequest = require('../middleware/validateRequest');
const { getLocation } = require('../service/location/locationModel');
const { getLocationWeather } = require('../service/weather/weatherModel');

const router = express.Router();

/**
 * * Get the weather for a location
 */

const containError = (response) => response?.error;

router.get(
  '/:city',
  validRequest,
  handler(async (req, res) => {
    const { city } = req;

    const location = await getLocation(city);
    if (containError(location)) {
      return res.send(location);
    }

    const locationWeather = await getLocationWeather(location);

    if (containError(locationWeather)) {
      return res.send(locationWeather);
    }

    return res.send({
      place: location.getPlaceName(),
      ...locationWeather
    });
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
