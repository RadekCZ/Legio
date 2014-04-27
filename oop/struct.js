'use strict';
var
Legio = require("../std"),
type = require("./type");

// The main function which generates a special constructor
function struct(definition, defaults) {
  var Con, keys = arguments, applyDefaults = true;

  if (Object.is(definition)) {
    var T = type(definition);

    keys = Object.ownKeys(definition);

    Con = function () {
      fill(this, keys, arguments);
      if (!T(this)) {
        throw new TypeError("Wrong type passed.");
      }
    };
  }
  else {
    if (Array.is(definition)) {
      keys = definition;
    }
    else {
      applyDefaults = false;
    }

    Con = function () {
      fill(this, keys, arguments);
    };
  }

  if (applyDefaults && defaults) {
    Con.prototype = defaults;
    Con.prototype.constructor = Con;
  }

  return Con;
}

// A function that fills properties by arguments
function fill(obj, keys, values) {
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    if (values[i] !== undefined) {
      obj[key] = values[i];
    }
  }
}

module.exports = struct;
