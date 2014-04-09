'use strict';
var
Legio = require("../std");

// A function which simulates an interface
function draft(inherits, data) {
  if (!data) {
    data = inherits;
  }
  else {
    data = Object.merge(inherits._interface, data);
  }

  var check = checkObject.bind(data);
  check._interface = data;

  return check;
}

function checkObject(obj) {
  var data = this;

  for (var i in data) if (Object.owns(data, i)) {
    var T = data[i], val = obj[i];

    if (T === null) {
      if (val === undefined) {
        return false;
      }
    }
    else if (T === Function || T === String || T === Number || T === Boolean || T === Array || T === Object) {
      if (!T.is(val)) {
        return false;
      }
    }
    else if (Function.is(T) && T._interface) {
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

module.exports = draft;
