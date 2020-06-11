/* eslint-disable no-console */
const { getLocationWeather } = require('./service/weather/weatherModel');
const { getLocation } = require('./service/location/locationModel');

getLocation('New York')
  .then((location) => {
    if (location.error) {
      return location;
    }
    return getLocationWeather(location);
  })
  .then(console.log)
  .catch(console.error);
