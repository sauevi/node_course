// eslint-disable-next-line import/no-commonjs
module.exports.Weather = class Weather {
  constructor(temperature, icon, description, localTime) {
    this.temperature = temperature;
    this.icon = icon;
    this.description = description;
    this.localTime = localTime;
  }

  getTemperature() {
    return this.temperature;
  }

  getIcon() {
    return this.icon;
  }

  getDescription() {
    return this.description;
  }

  getLocalTime() {
    return this.localTime;
  }
};
