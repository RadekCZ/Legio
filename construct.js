'use strict';
var
Legio = require("./std");

/** @module legio/construct */

/**
 * @typedef config
 * @property {Function} init The constructor function
 * @property {Object} [proto] The prototype of the constructor
 * @property {constructor} [inherit] An inherited constructor
 * @property {Object} [own] An object of static properties
 * @property {Object[]} [mixin] An array of mixins
 */

/**
 * @callback superCall
 * @param {String} methodName
 * @param {Array} [args]
 */

/**
 * @typedef construct
 * @type {Function}
 * @property {Function} [Super] The inherited constructor
 * @property {Function} [superInit] A method which calls the inherited constructor with given arguments.
 * @property {superCall} [superCall] A method which calls an inherited method.
 */

/**
 * A function which generates a special constructor using the data argument.
 * @alias module:legio/construct
 * @param {config}
 * @returns {construct}
 *
 * @example
    var A = construct({
      init: function (a) {
        this.a = a;
      },

      proto: {
        toString: function () {
          return "a: " + this.a;
        }
      }
    });

    var Show = {
      show: function () {
        alert(this.a + ", " + this.b);
      }
    };

    var B = construct({
      inherit: A,

      init: function (a, b) {
        this.superInit(a);

        this.b = b;
      },

      proto: {
        toString: function () {
          return this.superCall("toString") + ", b: " + this.b;
        }
      },

      mixin: [Show],

      own: {
        create: function (a, b) {
          return new B(a, b);
        }
      }
    });
 */
function construct(data) {
  var
  Con = data.init,
  Super = data.inherit,
  own = data.own,
  mixins = data.mixin,
  proto = data.proto;

  if (Super) {
    inherits(Con, Super);
    Con.assign(Super);
  }
  // else if (Parent === null) {
    // Fn.prototype = Object.create(null);
    // Parent = true;
  // }

  if (mixins) {
    for (var i = 0, j = mixins.length; i < j; ++i) {
      Con.mixin(mixins[i]);
    }
  }

  if (proto) {
    if (Super || mixins) {
      Con.mixin(proto);
    }
    else {
      Con.prototype = proto;
    }
  }

  if (own) {
    Con.assign(own);
  }

  Con.prototype.constructor = Con;

  return Con;
}

// This function is used to call the super constructor (in inherited constructs)
function superInit() {
  var
  sup = this.Super,
  proto = sup.prototype;

  this.Super = proto.Super;
  sup.apply(this, arguments);
  this.Super = sup;
}

// This method calls a method of the super construct
function superCall(name, args) {
  var
  sup = this.Super,
  proto = sup.prototype;

  this.Super = proto.Super;
  var res = proto[name].apply(this, args);
  this.Super = sup;

  return res;
}

// This method is used for the inheritance using the Object.create for the prototype
function inherits(Con, Super) {
  var proto = Con.prototype = Object.create(Super.prototype);

  proto.Super = Super;
  proto.superInit = superInit;
  proto.superCall = superCall;
}

module.exports = construct;
