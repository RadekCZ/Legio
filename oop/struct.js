'use strict';
var
Legio = require("../std"),
type = require("./type");

// The main function which generates a special constructor
function struct(keysArr, proto, def) {
  var Con, keys = arguments, applyDefaults = true;

  if (Array.is(keysArr)) {
    keys = keysArr;

    if (Object.is(def)) {
      var T = type(def);

      Con = function () {
        fill(this, keys, arguments);
        if (!T(this)) {
          throw new TypeError("Wrong type passed.");
        }
      };
    }
  }
  else {
    applyDefaults = false;
  }

  if (!Con) {
    Con = function () {
      fill(this, keys, arguments);
    };
  }

  if (applyDefaults && proto) {
    proto.constructor = Con;
    Con.prototype = proto;
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
