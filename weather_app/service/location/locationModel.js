const { getCoordinates } = require('./locationServices');
const { errorResponse } = require('../errors');
const { LocationBuilder } = require('./locationBuilder');

const getLocation = async (location) => {
  try {
    const response = await getCoordinates(location.replace(' ', '%20'));
    if (response?.features?.length === 0) {
      return errorResponse(location, 404);
    }
    return new LocationBuilder(
      response.features[0].center[1],
      response.features[0].center[0],
      response.features[0].place_name
    ).build();
  } catch (error) {
    return errorResponse();
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getLocation };
