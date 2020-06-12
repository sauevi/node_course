/**
 * * Fetching data from the Weatherstack API, documentation and more information about it here (https://weatherstack.com/documentation)
 */
const fetch = require('node-fetch');

const baseUrl = 'http://api.weatherstack.com';

const APIKEY = '1ebf964586beba2106f6985d4d246858';

const getCurrentWeather = async (coordinates) => {
  try {
    const fullUrl = `${baseUrl}/current?access_key=${APIKEY}&query=${coordinates}`;
    const response = await fetch(fullUrl);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    throw new Error('ERROR_FETCHING_DATA_WEATHERSTACK');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getCurrentWeather
};
