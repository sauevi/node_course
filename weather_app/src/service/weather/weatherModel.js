const { getCurrentWeather } = require('./weatherService');
const { errorResponse } = require('../errors');
const { WeatherBuilder } = require('./weatherBuilder');
const { logger } = require('../../logger/logger');

const getLocationWeather = async (location) => {
  try {
    const response = await getCurrentWeather(location.getLocationPoint());
    if (response?.error) {
      return errorResponse(location.getPlaceName(), response.error.code);
    }
    return new WeatherBuilder(
      response.current.temperature,
      response.current.weather_icons[0],
      response.current.weather_descriptions[0],
      response.location.localtime
    ).build();
  } catch (error) {
    logger.error(error);
    return errorResponse();
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getLocationWeather };
