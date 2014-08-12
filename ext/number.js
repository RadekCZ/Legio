'use strict';

/** @class Number */

var
NumberProto = Number.prototype,
pInt = parseInt,
pFloat = parseFloat,
isFin = isFinite;

/**
 * Determines whether the given value is a number.
 * @param {*} value
 * @returns {Boolean}
 */
Number.is = function (obj) { return typeof obj === "number"; };

/**
 * @function
 * @param {*} value
 * @param {Number} [radix]
 * @returns {Number}
 */
Number.parseInt = pInt;

/**
 * @function parseFloat
 * @memberof Number
 * @param {*} value
 * @returns {Number}
 */
/**
 * @function
 * @desc Alias for {@link Number.parseFloat}
 * @param {*} value
 * @returns {Number}
 */
Number.parse = Number.parseFloat = pFloat;

/**
 * @type {Number}
 */
Number.Infinity = Infinity;

/**
 * Global functions working with numbers.
 * Compared to own Number's methods, these convert the value to a number first.
 * @property {Function} isNaN
 * @property {Function} isFinite
 */
Number.global = {
  isNaN: isNaN,
  isFinite: isFin
};

if (!Number.isNaN || Object.DEBUG) {
  /**
   * @param {*} value
   * @returns {Boolean}
   */
  Number.isNaN = function (val) { return val !== val; };
}
if (!Number.isFinite || Object.DEBUG) {
  /**
   * @param {*} value
   * @returns {Boolean}
   */
  Number.isFinite = function (val) {
    return Number.is(val) && isFin(val);
  };
}
if (!Number.isInteger || Object.DEBUG) {
  /**
   * @param {*} value
   * @returns {Boolean}
   */
  Number.isInteger = function (num) {
    return Number.isFinite(num) && num.trunc() === num;
  };
}

/**
 * @param {*} value
 * @returns {Boolean}
 */
Number.isNumeric = function (num) {
  if (Number.is(num)) {
    return isFin(num);
  }
  else if (String.is(num) && num !== "") {
    return Number.isFinite(Number.parse(num));
  }
  return false;
};

/**
 * @alias Number#limitBottom
 * @param {Number}
 * @returns {Number}
 */
NumberProto.limitBottom = function (from) { return Math.max(from, this); }

/**
 * @alias Number#limitTop
 * @param {Number}
 * @returns {Number}
 */
NumberProto.limitTop = function (to) { return Math.min(this, to); }

/**
 * @alias Number#limit
 * @param {Number}
 * @param {Number}
 * @returns {Number}
 */
NumberProto.limit = function (from, to) { return this.limitBottom(from).limitTop(to); };

/**
 * @function Number#trunc
 * @returns {Number}
 */
/**
 * @function
 * @alias Number#toInt
 * @desc Alias for {@link Number#trunc}
 * @returns {Number}
 */
NumberProto.toInt = NumberProto.trunc = function () { return Math.trunc(this); };

/**
 * @alias Number#toFloat
 * @returns {Number}
 */
NumberProto.toFloat = function () { return this; };

/**
 * Default thousands separator used in the format function.
 * @type {String}
 */
Number.FORMAT_THOUSANDS_SEPARATOR = ",";

/**
 * Default decimal mark used in the format function.
 * @type {String}
 */
Number.FORMAT_DECIMAL_MARK = ".";

/**
 * @alias Number#format
 * @param {Number} [decimals=0]
 * @param {String} [thousandsSeparator=","]
 * @param {String} [decimalMark="."]
 * @returns {String}
 */
NumberProto.format = function (dec, thousandsSep, decMark) {
  thousandsSep === undefined && (thousandsSep = Number.FORMAT_THOUSANDS_SEPARATOR);
  decMark === undefined && (decMark = Number.FORMAT_DECIMAL_MARK);

  var
  parts = this.toFixed(dec).split("."),
  intPart = parts[0],
  fracPart = parts[1],
  intLen = intPart.length;

  intPart = intPart.reverse().replace(/(\d{3})/g, "$1" + thousandsSep).reverse();
  if (intLen % 3 === 0) {
    intPart = intPart.slice(1);
  }

  return intPart + (fracPart ? decMark + fracPart : "");
};

// Math functions added to the Number's prototype

/**
 * @alias Number#mod
 * @param {Number}
 * @returns {Number}
 */
NumberProto.mod = function (n) { return ((this % n) + n) % n; };

/**
 * @alias Number#abs
 * @returns {Number}
 */
NumberProto.abs = function () { return Math.abs(this); };

/**
 * @alias Number#round
 * @param {Number} [decimals=0]
 * @returns {Number}
 */
NumberProto.round = function (dec) {
  if (dec) {
    dec = Math.pow(10, dec);
    return Math.round(this * dec) / dec;
  }
  return Math.round(this);
};

/**
 * @alias Number#floor
 * @param {Number} [decimals=0]
 * @returns {Number}
 */
NumberProto.floor = function (dec) {
  if (dec) {
    dec = Math.pow(10, dec);
    return Math.floor(this * dec) / dec;
  }
  return Math.floor(this);
};

/**
 * @alias Number#ceil
 * @param {Number} [decimals=0]
 * @returns {Number}
 */
NumberProto.ceil = function (dec) {
  if (dec) {
    dec = Math.pow(10, dec);
    return Math.ceil(this * dec) / dec;
  }
  return Math.ceil(this);
};

/**
 * @alias Number#pow
 * @param {Number} [exponent=2]
 * @returns {Number}
 */
NumberProto.pow = function (exp) {
  exp === undefined && (exp = 2);

  return Math.pow(this, exp);
};

/**
 * @alias Number#sqrt
 * @returns {Number}
 */
NumberProto.sqrt = function () { return Math.sqrt(this); };

/**
 * @alias Number#log
 * @param {Number} [base=Math.E]
 * @returns {Number}
 */
NumberProto.log = function (base) { return base ? Math.log(this) / Math.log(base) : Math.log(this); };

/**
 * @alias Number#sign
 * @returns {Number} (-1 | 0 | 1)
 */
NumberProto.sign = function () { return Math.sign(this); }

/**
 * Converts degrees to radians.
 * @alias Number#toRad
 * @returns {Number}
 */
NumberProto.toRad = function () { return this * Math.PI / 180; };

/**
 * Converts radians to degrees.
 * @alias Number#toDeg
 * @returns {Number}
 */
NumberProto.toDeg = function () { return this * 180 / Math.PI; };
