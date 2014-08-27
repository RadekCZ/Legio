'use strict';

/** @namespace Math */

/**
 * Returns a random number within the limit (inclusive).
 * @param {Number}
 * @param {Number}
 * @returns {Number}
 */
Math.rand = function (from, to) { return from + Math.floor(Math.random() * (to - from + 1)); };

if (!Math.sign || Object.DEBUG) {
  /**
   * @param {Number} number
   * @returns {Number} (-1 | 0 | 1)
   */
  Math.sign = function (num) { return num === 0 ? 0 : (num > 0 ? 1 : -1); };
}

if (!Math.trunc || Object.DEBUG) {
  /**
   * Returns the integer part of the given number.
   * @param {Number} number
   * @returns {Number}
   */
  Math.trunc = function (num) { return Math[num < 0 ? "ceil" : "floor"](num); };
}
