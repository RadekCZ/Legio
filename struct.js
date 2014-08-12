'use strict';
var
Legio = require("./std"),
type = require("./type");

/** @module legio/struct */

/**
 * Easily generates a constructor based on given keys, prototype and type definition.
 * @alias module:legio/struct
 * @param {String[]} keys If just keys are given, the array is not necessary.
 * @param {Object} [prototype]
 * @param {Object} [typeDefinition] An object passed to the `type()` function.
 * @returns {constructor}
 *
 * @example
    // A basic struct
    var Point = struct("x", "y", "z");

    var p = new Point(1, 2, 3); // p.x = 1; p.y = 2; p.z = 3;

 * @example
    // Using the type definition
    var TypedPoint = struct(
      ["x", "y", "z"], null,
      { x: Number, y: Number, z: type.OR(type.UNDEFINED, Number) }
    );

    var
    p1 = new TypedPoint(1, 2, 3), // Okay
    p2 = new TypedPoint(1, 2), // Okay
    p3 = new TypedPoint(1, "hello"); // Error
 */
function struct(keysArr, proto, def) {
  var Con, keys = arguments, applyDefaults = true;

  if (Array.is(keysArr)) {
    keys = keysArr;

    if (def) {
      var T = type.is(def) ? def : type(def);

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

// A function that fills properties with values
function fill(obj, keys, values) {
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    if (values[i] !== undefined) {
      obj[key] = values[i];
    }
  }
}

module.exports = struct;
