const express = require('express');
const handler = require('../middleware/handler');
const validRequest = require('../middleware/validateRequest');
const { getLocation } = require('../service/location/locationModel');
const { getLocationWeather } = require('../service/weather/weatherModel');

const router = express.Router();

/**
 * * Get the weather for a location
 */
router.get(
  '/:city',
  validRequest,
  handler(async (req, res) => {
    const { city } = req;
    const location = await getLocation(city);
    const locationWeather = await getLocationWeather(location);

    let response;
    if (locationWeather?.error) {
      response = locationWeather;
    } else {
      response = {
        place: location.getPlaceName(),
        ...locationWeather
      };
    }

    res.send(response);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
