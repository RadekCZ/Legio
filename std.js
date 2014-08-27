'use strict';

/** @module legio */

// Extensions of the base library
require("./ext/object");
require("./ext/array");
require("./ext/function");
require("./ext/regexp");
require("./ext/string");
require("./ext/math");
require("./ext/number");
require("./ext/boolean");
require("./ext/date");

/**
 * @alias module:legio
 * @ignore
 */
function Legio() { return Legio; }

/**
 * @param {*} value
 * @returns {Boolean} A boolean determining whether the value is null or undefined
 */
Legio.empty = function (obj) { return obj === undefined || obj === null; };

/**
 * @param {*} value1
 * @param {*} value2
 * @returns {*} The first of values which is both not null and not undefined. Otherwise the second value.
 */
Legio.choose = function (val1, val2) { return Legio.empty(val1) ? val2 : val1; };

module.exports = Legio;
