'use strict';

/** @class Date */

var
DateProto = Date.prototype;

if (!Date.now) {
  /**
   * Gives the current UNIX timestamp in milliseconds.
   * @returns {Number}
   */
  Date.now = function () { return +(new Date()); };
}

/**
 * Returns the number of the day in ISO format (Monday = 1, Sunday = 7).
 * @alias Date#getISODay
 * @returns {Number}
 */
DateProto.getISODay = function () { return this.getDay() || 7; }

/**
 * @alias Date#getWeek
 * @returns {Number}
 */
DateProto.getWeek = function () {
  var d = new Date(+this);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

/**
 * @alias Date#getYearOfWeek
 * @returns {Number}
 */
DateProto.getYearOfWeek = function () {
  var d  = new Date(+this);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  return d.getFullYear();
};
