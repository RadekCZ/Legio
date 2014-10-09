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
 * @alias Function#bindArray
 * @param {Object} that
 * @param {Array} args
 * @returns {Function}
 * @throws {TypeError}
 */
FunctionProto.bindArray = function (that, args) {
  return this.bind.apply(this, [that].add(args));
};


/**
 * Alias for {Function#bindArray}
 * @alias Function#bindList
 * @function
 * @deprecated since v0.3.1
 */
FunctionProto.bindList = FunctionProto.bindArray;

/**
 * Similar to bind, but with dynamic `this`
 * @alias Function#tie
 * @param {...*} args
 * @returns {Function}
 */
FunctionProto.tie = function () {
  var
  fn = this,
  args = Array.from(arguments);

  return function () {
    fn.apply(this, args.concat(Array.from(arguments)));
  };
};

/**
 * @alias Function#tieArray
 * @param {Array} args
 * @returns {Function}
 */
FunctionProto.tieArray = function (args) {
  return this.tie.apply(this, args);
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
