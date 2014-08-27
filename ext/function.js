'use strict';

/** @class Function */

var
FunctionProto = Function.prototype;

/**
 * Determines whether the given value is a function.
 * @param {*} value
 * @returns {Boolean}
 */
Function.is = function (obj) { return typeof obj === "function"; };

if (!FunctionProto.bind || Object.DEBUG) {
  /**
   * @alias Function#bind
   * @param {Object} that
   * @param {...*} args
   * @returns {Function}
   * @throws {TypeError}
   */
  FunctionProto.bind = function (that) {
    if (!Function.is(this)) {
      throw new TypeError("Can't bind anything except funcitons!");
    }

    var
    func = this,
    Empty = function () {};

    Empty.prototype = func.prototype;

    if (arguments.length <= 1) {
      return function () { return func.apply(this instanceof Empty && that ? this : that, arguments); };
    }

    var args = Array.from(arguments).removeAt(0);
    return function () { return func.apply(this instanceof Empty && that ? this : that, args.concat(Array.from(arguments))); }
  };
}

/**
 * @alias Function#bindList
 * @param {Object} that
 * @param {Array} args
 * @returns {Function}
 * @throws {TypeError}
 */
FunctionProto.bindList = function (that, args) {
  return this.bind.apply(this, [that].add(args));
};

/**
 * @alias Function#mixin
 * @desc Assigns properties of the given object into the function's prototype.
 * @param {Object} object
 * @returns {this}
 */
FunctionProto.mixin = function (obj) {
  var proto = this.prototype;
  Object.assign(proto, obj);
  proto.constructor = this;
  return this;
};

/**
 * @alias Function#assign
 * @desc Assigns properties of the given object directly into the function as static properties.
 * @param {Object} object
 * @returns {this}
 */
FunctionProto.assign = function (obj) {
  var proto = this.prototype;
  Object.assign(this, obj);
  this.prototype = proto;
  return this;
};
