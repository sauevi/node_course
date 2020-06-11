const { getCurrentWeather } = require('./weatherService');
const { errorResponse } = require('../errors');

const getLocationWeather = async (location) => {
  try {
    const response = await getCurrentWeather(location.getLocationPoint());
    if (response?.error) {
      return errorResponse(location.getPlaceName(), response.error.code);
    }
    return response;
  } catch (error) {
    return errorResponse();
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getLocationWeather };
