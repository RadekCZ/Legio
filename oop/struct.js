'use strict';
var
Legio = require("../std");

// The main function which generates a special constructor
function struct() {
  var keys = arguments;
  return function () {
    fill(this, keys, arguments);
  };
}

// A function that fills properties by arguments
function fill(obj, keys, values) {
  for (var i = 0; i < keys.length; ++i) {
    obj[keys[i]] = values[i];
  }
}

module.exports = struct;
