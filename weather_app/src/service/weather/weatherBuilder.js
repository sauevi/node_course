const { Weather } = require('./Weather');

// eslint-disable-next-line import/no-commonjs
module.exports.WeatherBuilder = class WeatherBuilder {
  constructor(temperature, icon, description, localTime) {
    this.temperature = temperature;
    this.icon = icon;
    this.description = description;
    this.localTime = localTime;
  }

  build() {
    return new Weather(
      `${this.temperature} °F`,
      this.icon,
      this.description,
      this.localTime
    );
  }
};
