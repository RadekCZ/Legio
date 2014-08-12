'use strict';

/** @class RegExp */

var
RegExpProto = RegExp.prototype;

var specials = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g;
/**
 * Escapes the given string so it can be used inside of a regular expression.
 * @param {String} string
 * @returns {String}
 */
RegExp.escape = function (str) { return str.replace(specials, "\\$1"); };

/**
 * Returns a string representing RegExp's flags (g, i, m).
 * @alias RegExp#flags
 * @returns {String}
 */
RegExpProto.flags = function () {
  return "g".substr(0, +this.global) + "i".substr(0, +this.ignoreCase) + "m".substr(0, +this.multiline);
};
