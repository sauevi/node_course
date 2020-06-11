const { getCurrentWeather } = require('./weatherService');
const { errorResponse } = require('../errors');

const getCurrentLocationWeather = async (coordinates, place) => {
  try {
    const { longitud, latitud } = coordinates;
    const response = await getCurrentWeather(`${latitud},${longitud}`);
    if (response?.error) {
      return errorResponse(place, response.error.code);
    }
    return response;
  } catch (error) {
    return errorResponse();
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getCurrentLocationWeather };
