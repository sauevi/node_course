/* eslint-disable no-console */
const { getCurrentLocationWeather } = require('./service/weather/weatherModel');
const { getLocationCoordinates } = require('./service/location/locationModel');

getLocationCoordinates('New York')
  .then((response) => {
    const { success, data } = response;

    if (!success) {
      return data.info;
    }

    return getCurrentLocationWeather(
      {
        latitud: data.latitud,
        longitud: data.longitud
      },
      data.place
    );
  })
  .then(console.log)
  .catch(console.error);
