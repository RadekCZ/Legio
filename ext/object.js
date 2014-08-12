'use strict';

/** @class Object */

var
ObjectProto = Object.prototype,
hasOwn = ObjectProto.hasOwnProperty,
objToStr = ObjectProto.toString;

/**
 * Determines whether the given value is an object.
 * @param {*} value
 * @returns {Boolean}
 */
Object.isAny = function (obj) {
  return typeof obj === "object" && obj !== null;
};

/**
 * Determines whether the given value is a plain (not special) object.
 * @param {*} value
 * @returns {Boolean}
 */
Object.isPlain = function (obj) {
  return Object.isAny(obj) && objToStr.call(obj) === "[object Object]";
};


/**
 * Determines whether the object owns the given property.
 * @param {Object} object
 * @param {String} property
 * @returns {Boolean}
 */
Object.owns = function (obj, prop) { return hasOwn.call(obj, prop); };

if (!Object.is || Object.DEBUG) {
  /**
   * Strict equality with support for NaN and +0/-0 values.
   * @param {*} a
   * @param {*} b
   * @returns {Boolean}
   */
  Object.is = function (a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a !== a) {
      return b !== b;
    }
    return a === b;
  };
}
if (!Object.create || Object.DEBUG) {
  /**
   * Returns a new object inheriting form the given object.
   * @param {Object} object
   * @returns {Object}
   */
  Object.create = function (obj) {
    var Empty = function () {};
    Empty.prototype = obj;
    return new Empty();
  };
}
if (!Object.keys || Object.DEBUG) {
  /**
   * Returns an array of all enumerable properties.
   * @param {Object} object
   * @returns {String[]}
   */
  Object.keys = function (obj) {
    var result = [];
    for (var i in obj) if (Object.owns(obj, i)) {
      result.push(i);
    }
    return result;
  };
}

/**
 * Determines whether the object doesn't have any own properties (so it's empty) or is an empty value
 * (null, undefined, 0, NaN, false, "").
 * @param {*} value
 * @returns {Boolean}
 */
Object.empty = function (obj) {
  if (obj) {
    for (var prop in obj) if (Object.owns(obj, prop)) {
      return false;
    }
  }
  return true;
};

/**
 * Clones the given object and returns the clone.
 * @param {Object|Array}
 * @param {Boolean} [deep=true]
 * @returns {Object|Array}
 */
Object.clone = function clone(source, deep) {
  deep === undefined && (deep = true);

  if (Array.is(source)) {
    var arr = [];
    for (var i = 0; i < source.length; ++i) {
      arr[i] = deep ? clone(source[i]) : source[i];
    }
    return arr;
  }
  else if (Object.isAny(source) && source !== global) { // && !source.nodeType
    var obj = {};
    for (var i in source) if (Object.owns(source, i)) {
      obj[i] = deep ? clone(source[i]) : source[i];
    }
    return obj;
  }

  return source;
};

if (!Object.assign || Object.DEBUG) {
  /**
   * Extends the object with properties from other objects.
   * @param {Object} object
   * @param {...Object} extensions
   * @returns {Object} The given object
   */
  Object.assign = function assign(obj, extension) {
    if (arguments.length > 2) {
      for (var i = 1; i < arguments.length; ++i) {
        assign(obj, arguments[i]);
      }
    }
    else {
      for (var i in extension) if (Object.owns(extension, i)) {
        obj[i] = extension[i];
      }
    }
    return obj;
  };
}

/**
 * Merges given objects to a single one and returns it.
 * @param {...Object} objects
 * @returns {Object}
 */
Object.merge = function () {
  var out = {};
  for (var i = 0; i < arguments.length; ++i) {
    Object.assign(out, arguments[i]);
  }
  return out;
};

/**
 * Simulates the foreach loop.
 * @param {Object|Array} collection
 * @param {Function} callback
 * @returns {Object|Array} The given collection
 */
Object.each = function (obj, func) {
  if (Array.is(obj)) {
    return obj.each(func);
  }

  for (var i in obj) if (Object.owns(obj, i)) {
    if (func.call(obj, obj[i], i, obj) === false) {
      break;
    }
  }

  return obj;
};

/**
 * Convert the given object to a query string.
 * @param {Object|Array} object
 * @param {String} [namespace]
 * @returns {String}
 */
Object.toQueryString = function toQueryString(obj, ns) {
  var res = [];

  Object.each(obj, function (item, i) {
    if (item === undefined) { return; }

    var key = ns ? ns + "[" + i + "]" : i;

    if (Object.isAny(item)) {
      res.push(toQueryString(item, key));
    }
    else {
      res.push(key.encodeURI() + (item === null ? "" : "=" + String(item).encodeURI()));
    }
  });

  return res.join("&");
};

var
beforeQuery = /^(.*?)\?/,
isInt = /^\d*$/,
allSubkeys = /^(.+?)\[(.*)\]$/;

/**
 * Convert the given query string to an object.
 * @param {String} queryString
 * @param {Boolean} [convertBools=false]
 * @returns {Object}
 */
Object.fromQueryString = function (str, convertBools) {
  var
  res = {},
  items = str.replace(beforeQuery, "").split("&");

  for (var i = 0; i < items.length; ++i) {
    var item = items[i].split("=");

    var
    obj = res,
    key = item[0].decodeURI(),
    val = item.length >= 2 ? item[1].decodeURI() : null,
    subkeys = allSubkeys.exec(key);

    if (subkeys) {
      key = subkeys[1];
      subkeys = subkeys[2].split("][");

      for (var j = 0; j < subkeys.length; ++j) {
        var subkey = subkeys[j];

        if (!Object.owns(obj, key)) {
          obj[key] = isInt.test(subkey) ? [] : {};
        }
        if (!subkey) {
          subkey = obj[key].length;
        }

        obj = obj[key];
        key = subkey;
      }
    }

    if (convertBools) {
      if (val === "true") { val = true; }
      else if (val === "false") { val = false; }
    }

    obj[key] = val;
  }

  return res;
};
