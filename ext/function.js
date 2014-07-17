'use strict';

var
FunctionProto = Function.prototype;

Function.is = function (obj) { return typeof obj === "function"; };

if (!FunctionProto.bind) {
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

    var args = Array.from(arguments, 1);
    return function () { return func.apply(this instanceof Empty && that ? this : that, args.concat(Array.from(arguments))); }
  };
}

FunctionProto.bindList = function (that, args) {
  return this.bind.apply(this, [that].add(args));
};

FunctionProto.mixin = function (obj) {
  var proto = this.prototype;
  Object.assign(proto, obj);
  proto.constructor = this;
  return this;
};
FunctionProto.assign = function (obj) {
  var proto = this.prototype;
  Object.assign(this, obj);
  this.prototype = proto;
  return this;
};
