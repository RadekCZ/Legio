'use strict';
var
Legio = require("../std");

// A function which simulates an interface
function type(inherits, data) {
  if (!data) {
    data = inherits;
    inherits = null;
  }

  var check = Object.is(data) ? checkObject.bind(data) : checkValue.bind(null, data);

  if (inherits) {
    if (!inherits._type) {
      inherits = type(null, inherits);
    }

    var oldCheck = check;

    check = function (obj) {
      return inherits(obj) && oldCheck(obj);
    };
  }

  check._type = data;
  return check;
}

type.OR = function () {
  return [type.OR].add(arguments);
};
type.DEFINED = 1;
type.UNDEFINED = 2;
type.NULL = 3;
type.FULL = 4;

function checkObject(obj) {
  var data = this;

  for (var i in data) if (Object.owns(data, i)) {
    var T = data[i], val = obj[i];

    if (!checkValue(T, val)) {
      return false;
    }
  }

  return true;
}

function checkValue(T, val) {
  if (Array.is(T)) {
    if (T[0] === type.OR) {
      for (var i = 1; i < T.length; ++i) {
        var subT = T[i];

        if (checkValue(subT, val)) {
          return true;
        }
      }

      return false;
    }

    T = T[0];

    if (!Array.is(val)) {
      return false;
    }

    if (T) {
      for (var i = 0; i < val.length; ++i) {
        var subval = val[i];

        if (!checkValue(T, subval)) {
          return false;
        }
      }
    }
  }
  else if (Number.is(T)) {
    switch (T) {
      case type.DEFINED:
        if (val === undefined) {
          return false;
        }
        break;
      case type.UNDEFINED:
        if (val !== undefined) {
          return false;
        }
        break;
      case type.NULL:
        if (val !== null) {
          return false;
        }
        break;
      case type.FULL:
        if (val === undefined || val === null) {
          return false;
        }
        break;
    }
  }
  else if (T === Function || T === String || T === Number || T === Boolean || T === Array || T === Object) {
    if (!T.is(val)) {
      return false;
    }
  }
  else if (Function.is(T)) {
    if (T._type) {
      if (!T(val)) {
        return false;
      }
    }
    else if (!(val instanceof T)) {
      return false;
    }
  }

  return true;
}

module.exports = type;
