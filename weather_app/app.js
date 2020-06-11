/* eslint-disable no-console */
const { getCurrentLocationWeather } = require('./service/weather/weatherModel');
const { getLocationCoordinates } = require('./service/location/locationModel');

getLocationCoordinates('New York')
  .then((response) => {
    if (response.success) {
      return getCurrentLocationWeather(response.data);
    }
    return response.data;
  })
  .then(console.log)
  .catch(console.error);
