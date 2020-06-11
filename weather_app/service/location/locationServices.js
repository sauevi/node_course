/**
 * * Fetching data from the MapBox API, documentation and more information about it here(https://docs.mapbox.com/api/)
 */
const fetch = require('node-fetch');

const baseUrl = 'https://api.mapbox.com';
// eslint-disable-next-line operator-linebreak
const APIKEY =
  'pk.eyJ1Ijoic2F1bHZpbGxhbWl6YXIiLCJhIjoiY2tiYXhjOGNwMGE3aDJ5czhudmwxaG5jMiJ9.iQG_SltRfzV68FucSywNWA';

const getCoordinates = async (location) => {
  try {
    const fullUrl = `${baseUrl}/geocoding/v5/mapbox.places/${location}.json?access_token=${APIKEY}`;
    const response = await fetch(fullUrl);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('FETCHING_DATA_GEOCOORDINATES');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = { getCoordinates };
