const { getCoordinates } = require('./locationServices');
const { errorResponse } = require('../errors');

const createResponse = (features) => ({
  success: true,
  data: {
    place: features.place_name,
    longitud: features.center[0],
    latitud: features.center[1]
  }
});

const getLocationCoordinates = async (location) => {
  try {
    const response = await getCoordinates(location.replace(' ', '%20'));
    if (response?.features?.length === 0) {
      return errorResponse(location, 404);
    }
    return createResponse(response.features[0]);
  } catch (error) {
    return errorResponse();
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getLocationCoordinates };
