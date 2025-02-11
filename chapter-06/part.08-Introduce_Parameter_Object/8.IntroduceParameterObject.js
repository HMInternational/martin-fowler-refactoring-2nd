const station = { name: 'ZB1' };

function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }

  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }

  contains(aNumber) {
    return aNumber >= this.min && aNumber <= this.max;
  }
}

module.exports = {
  readingsOutsideRange,
  NumberRange,
};
