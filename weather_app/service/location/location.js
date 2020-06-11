// eslint-disable-next-line import/no-commonjs
module.exports.Location = class Location {
  constructor(latitud, longitud, placeName) {
    this.latitud = latitud;
    this.longitud = longitud;
    this.placeName = placeName;
  }

  getLocationPoint() {
    return `${this.latitud},${this.longitud}`;
  }

  getPlaceName() {
    return this.placeName;
  }
};
