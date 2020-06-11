const { getCurrentWeather } = require('./weatherService');

const failResponse = {
  success: false,
  data: {
    info: 'Opps... something went wrong'
  }
};

const errorResponse = (error) => {
  const { data } = failResponse;
  if (error.code === 404) {
    data.info = 'Not found';
  }
  return failResponse;
};

const getCurrentLocationWeather = async (coordinates) => {
  try {
    const { longitud, latitud } = coordinates;
    const response = await getCurrentWeather(`${latitud},${longitud}`);
    if (response?.error) {
      return errorResponse(response.error);
    }
    return response;
  } catch (error) {
    return failResponse;
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getCurrentLocationWeather };
