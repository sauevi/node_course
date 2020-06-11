const { getCoordinates } = require('./locationServices');

const failResponse = {
  success: false,
  data: {
    info: 'Opps... something went wrong'
  }
};

const notFoundResponse = (location) => {
  failResponse.data.info = `${location}, was not found`;
  return failResponse;
};

const createResponse = (features) => ({
  success: true,
  data: {
    longitud: features.center[0],
    latitud: features.center[1]
  }
});

const getLocationCoordinates = async (location) => {
  try {
    const response = await getCoordinates(location.replace(' ', '%20'));
    if (response?.features?.length === 0) {
      return notFoundResponse(location);
    }
    return createResponse(response.features[0]);
  } catch (error) {
    return failResponse;
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getLocationCoordinates };
