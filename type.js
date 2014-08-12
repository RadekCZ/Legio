'use strict';
var
Legio = require("./std");

/** @module legio/type */

/**
 * @callback type
 * @param {*} value
 */

/**
 * @alias module:legio/type
 * @param {type} [inherits]
 * @param {Object<String,(constructor|type)>|constructor} definition
 * @returns {type} A function which (when called) chcecks if the given object corresponds with the definition.
 *
 * @example
    var
    A = type({ b: String, c: Number }),
    B = type(A, { a: Function });

    var
    a = {
      a: function () {},
      b: "hello",
      c: 42
    },
    b = {
      a: "error",
      b: "hello",
      c: 42
    };

    console.log(A(a), A(b)); // true, true
    console.log(B(a), B(b)); // true, false

    var
    C = type({ d: type.UNDEFINED, a: type.OR(String, Function) });

    console.log(C(a), C(b)); // true, true
 */
function type(inherits, def) {
  if (!def) {
    def = inherits;
    inherits = null;
  }

  var check = (Object.isPlain(def) && !(def instanceof Or)) ? checkObject.bind(def) : checkValue.bind(null, def);

  if (inherits) {
    if (!inherits._type) {
      inherits = type(null, inherits);
    }

    var originalCheck = check;

    check = function (obj) {
      return inherits(obj) && originalCheck(obj);
    };
  }

  check._type = def;

  return check;
}

/**
 * It checks whether the given value is a type or not
 * @param {*} value
 */
type.is = function (obj) {
  return Function.is(obj) && obj._type !== undefined;
};

var Or = function (args) {
  this.types = Array.from(args);
};

/**
 * Returns a custom type which can equal to any of the given types
 * @param {...*} types
 */
type.OR = function () {
  return new Or(arguments);
};

/** value !== undefined */
type.DEFINED = 1;
/** value === undefined */
type.UNDEFINED = 2;
/** value === null*/
type.NULL = 3;
/** value !== undefined && value !== null */
type.FULL = 4;
/** value === undefined || value === null */
type.EMPTY = type.OR(type.UNDEFINED, type.NULL);

function checkObject(obj) {
  if (!Object.isAny(obj)) {
    return false;
  }

  var data = this;

  for (var i in data) if (Object.owns(data, i)) {
    if (!checkValue(data[i], obj[i])) {
      return false;
    }
  }

  return true;
}

function checkValue(T, val) {
  if (Array.is(T)) {
    T = T[0];

    if (!Array.is(val)) {
      return false;
    }

    if (T) {
      for (var i = 0; i < val.length; ++i) {
        if (!checkValue(T, val[i])) {
          return false;
        }
      }
    }
  }
  else if (Number.is(T)) {
    switch (T) {
      case type.DEFINED:
        return val !== undefined;
      case type.UNDEFINED:
        return val === undefined;
      case type.NULL:
        return val === null;
      case type.FULL:
        return val !== undefined && val !== null;
    }
  }
  else if (T instanceof Or) {
    T = T.types;

    for (var i = 0; i < T.length; ++i) {
      if (checkValue(T[i], val)) {
        return true;
      }
    }

    return false;
  }
  else if (T === Function || T === String || T === Number || T === Boolean || T === Array) {
    return T.is(val);
  }
  else if (T === Object) {
    return T.isPlain(val);
  }
  else if (Function.is(T)) {
    if (type.is(T)) {
      return T(val);
    }
    else {
      return val instanceof T;
    }
  }

  return true;
}

module.exports = type;
