const { Location } = require('./location');

// eslint-disable-next-line import/no-commonjs
module.exports.LocationBuilder = class LocationBuilder {
  constructor(latitud, longitud, placeName) {
    this.latitud = latitud;
    this.longitud = longitud;
    this.placeName = placeName;
  }

  build() {
    return new Location(this.latitud, this.longitud, this.placeName);
  }
};
