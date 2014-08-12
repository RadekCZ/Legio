'use strict';

/** @class String */

var
StringProto = String.prototype,
pInt = parseInt, pFloat = parseFloat,
encURI = encodeURI, decURI = decodeURI, encURIParam = encodeURIComponent, decURIParam = decodeURIComponent;

/**
 * Determines whether the given value is a string.
 * @param {*} value
 * @returns {Boolean}
 */
String.is = function (obj) { return typeof obj === "string"; };

/**
 * @alias String#replaceAll
 * @param {String} substr
 * @param {String} newSubstr
 * @returns {String}
 */
StringProto.replaceAll = function (from, to) { return this.split(from).join(to); };

/**
 * @alias String#toInt
 * @param {Number} [radix=10]
 * @returns {Number}
 */
StringProto.toInt = function (radix) { return pInt(this, radix || 10); };

/**
 * @alias String#toFloat
 * @returns {Number}
 */
StringProto.toFloat = function () { return pFloat(this); };

/**
 * @alias String#encodeURI
 * @param {Boolean} [partial]
 * @returns {String} URI-encoded value
 */
StringProto.encodeURI = function (partial) { return partial ? encURI(this) : encURIParam(this); };

/**
 * @alias String#decodeURI
 * @param {Boolean} [partial]
 * @returns {String} URI-decoded value
 */
StringProto.decodeURI = function (partial) { return partial ? decURI(this) : decURIParam(this); };

/**
 * Default value used in pad functions.
 * @type {String}
 */
String.PADDING = " ";

/**
 * @alias String#padLeft
 * @param {Number} length
 * @param {String} [padString=" "]
 * @returns {String}
 */
StringProto.padLeft = function (n, str) {
  str === undefined && (str = String.PADDING);

  n -= this.length;

  if (n > 0) {
    return str.repeatUntil(n) + this;
  }

  return this;
};

/**
 * @alias String#padRight
 * @param {Number} length
 * @param {String} [padString=" "]
 * @returns {String}
 */
StringProto.padRight = function (n, str) {
  str === undefined && (str = String.PADDING);

  n -= this.length;

  if (n > 0) {
    return this + str.repeatUntil(n);
  }

  return this;
};

/**
 * @alias String#pad
 * @param {Number} length
 * @param {String} [padString=" "]
 * @returns {String}
 */
StringProto.pad = function (n, str) {
  return this.padLeft(this.length + ((n - this.length) / 2).floor(), str).padRight(n, str);
};

/**
 * @alias String#chars
 * @returns {String[]} An array of chars
 */
StringProto.chars = function () { return this.split(""); }

/**
 * @alias String#reverse
 * @returns {String}
 */
StringProto.reverse = function () {
  return this.split("").reverse().join("");
};

/**
 * @alias String#assign
 * @desc Assigns values from the object into variables in curly braces.
 * @param {Object} object
 * @returns {String}
 * @example
    "{test} {noSuchProperty}".assign({ test: "test value" });
    // this results in "test value {noSuchProperty}"
 */
StringProto.assign = function (obj) {
  return this.replace(/\{(\w+)\}/g, function (m, p1) {
    return p1 in obj ? obj[p1] : m;
  });
};

/**
 * @alias String#normalizeLines
 * @desc Replaces both \r\n & \r by just \n.
 * @returns {String}
 */
StringProto.normalizeLines = function () {
  return this.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
};

if (!StringProto.trim || Object.DEBUG) {
  var trimRgx = /^\s+|\s+$/g;

  /**
   * @alias String#trim
   * @memberof String
   * @instance
   * @returns {String}
   */
  StringProto.trim = function () { return this.replace(trimRgx, ""); };
}
if (!StringProto.trimLeft || Object.DEBUG) {
  var trimLeftRgx = /^\s+/g;

  /**
   * @alias String#trimLeft
   * @memberof String
   * @instance
   * @returns {String}
   */
  StringProto.trimLeft = function () { return this.replace(trimLeftRgx, ""); };
}
if (!StringProto.trimRight || Object.DEBUG) {
  var trimRightRgx = /\s+$/g;

  /**
   * @alias String#trimRight
   * @memberof String
   * @instance
   * @returns {String}
   */
  StringProto.trimRight = function () { return this.replace(trimRightRgx, ""); };
}

if (!StringProto.contains || Object.DEBUG) {
  /**
   * @alias String#trim
   * @memberof String
   * @instance
   * @param {String} substr
   * @param {Number} [index=0]
   * @returns {String}
   */
  StringProto.contains = function (str, index) { return this.indexOf(str, index) !== -1; };
}
if (!StringProto.startsWith || Object.DEBUG) {
  /**
   * @alias String#startsWith
   * @memberof String
   * @instance
   * @param {String} substr
   * @param {Number} [index=0]
   * @returns {String}
   */
  StringProto.startsWith = function (str, index) {
    index === undefined && (index = 0);

    return this.substr(index, str.length) === str;
  };
}
if (!StringProto.endsWith || Object.DEBUG) {
  /**
   * @alias String#endsWith
   * @memberof String
   * @instance
   * @param {String} substr
   * @param {Number} [index=this.length]
   * @returns {String}
   */
  StringProto.endsWith = function (str, index) {
    index === undefined && (index = this.length);

    index -= str.length;

    return this.substr(index, str.length) === str;
  };
}

if (!StringProto.repeat || Object.DEBUG) {
  /**
   * @alias String#repeat
   * @memberof String
   * @instance
   * @param {Number} times
   * @returns {String}
   * @throws {RangeError}
   */
  StringProto.repeat = function (times) {
    if (times < 0 || times === Number.Infinity) {
      throw new RangeError();
    }

    var res = "";
    for (var i = 0; i < times; ++i) {
      res += this;
    }
    return res;
  };
}

/**
 * @alias String#repeatUntil
 * @param {Number} length
 * @returns {String}
 * @throws {RangeError}
 */
StringProto.repeatUntil = function (length) {
  if (length < 0 || length === Number.Infinity) {
    throw new RangeError();
  }

  if (!this) {
    return this;
  }

  var res = "";
  while (res.length < length) {
    res += this;
  }

  if (res.length > length) {
    res = res.substr(0, length);
  }

  return res;
};

if ("ab".substr(-1) !== "b" || Object.DEBUG) {
  var originalSubstr = StringProto.substr;

  /**
   * @alias String#substr
   * @memberof String
   * @instance
   * @desc Supports negative index.
   * @param {Number} [index=0]
   * @param {Number} [length]
   * @returns {String}
   */
  StringProto.substr = function(start, length) {
    if (start < 0) {
      start = this.length + start;
    }

    return originalSubstr.call(this, start, length);
  };
}

// The strings formatting stuff

var diacriticsMap = require("./string-diacritics").map;
/**
 * @alias String#removeDiacritics
 * @returns {String}
 */
StringProto.removeDiacritics = function () {
  return this.replace(/[^\u0000-\u007E]/g, function (ch) {
    return diacriticsMap[ch] || ch;
  });
};

/**
 * @alias String#capitalize
 * @param {Boolean} [all=false]
 * @returns {String}
 */
StringProto.capitalize = function (all) {
  var rgx = all ? /(^|\s)([a-z])/g : /(^)([a-z])/;
  return this.trim().replace(rgx, function (m) {
    return m.toUpperCase();
  });
};

/**
 * @alias String#dasherize
 * @returns {String}
 */
StringProto.dasherize = function () {
  return this.replace(/(\s|_)/g, "-")
    .replace(/[A-Z]/g, function (m, ind, str) {
      var lowerM = m.toLowerCase();
      if (ind === 0 || str[ind - 1] === "-") {
        return lowerM;
      }
      return "-" + lowerM;
    });
};

/**
 * @alias String#underscore
 * @returns {String}
 */
StringProto.underscore = function () {
  return this.dasherize().replace(/\-/g, "_");
};

/**
 * @alias String#spacify
 * @returns {String}
 */
StringProto.spacify = function () {
  return this.dasherize().replace(/\-+/g, " ");
};

/**
 * @alias String#camelize
 * @param {Boolean} [first=true]
 * @returns {String}
 */
StringProto.camelize = function (first) {
  var words = this.dasherize().split("-");

  for (var i = 0; i < words.length; ++i) {
    var word = words[i];

    if (first === false && word !== "") {
      first = true;
      continue;
    }

    words[i] = word.capitalize();
  }

  return words.join("");
};

/**
 * @alias String#parametrize
 * @desc Creates an URI-safe identifier from the string.
 * @param {String} [separator="-"]
 * @returns {String}
 */
StringProto.parametrize = function (sep) {
  return this.removeDiacritics().replace(/[^a-z0-9\-]+/gi, " ")
    .trim().replace(/ +/g, sep || "-").toLowerCase().encodeURI();
};
