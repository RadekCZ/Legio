'use strict';

var
ObjectProto = Object.prototype,
hasOwn = ObjectProto.hasOwnProperty,
objToStr = ObjectProto.toString;

if (!Object.is) {
  Object.is = function (a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a !== a) {
      return b !== b;
    }
    return a === b;
  };
}

var objIs = Object.is;
Object.is = function (obj) {
  if (arguments.length === 1) {
    return typeof obj === "object" && obj !== null && !Array.is(obj);
  }

  return objIs.apply(Object, arguments);
};

Object.owns = function (obj, prop) { return hasOwn.call(obj, prop); };

if (!Object.create) {
  Object.create = function (obj) {
    var Empty = function () {};
    Empty.prototype = obj;
    return new Empty();
  };
}
if (!Object.keys) {
  Object.keys = function (obj) {
    var result = [];
    for (var i in obj) if (Object.owns(obj, i)) {
      result.push(i);
    }
    return result;
  };
}

Object.empty = function (obj) {
  if (obj) {
    for (var prop in obj) if (Object.owns(obj, prop)) {
      return false;
    }
  }
  return true;
};

Object.clone = function clone(source) {
  if (Object.is(source) && source !== global) { // && !source.nodeType
    var obj = {};
    for (var i in source) if (Object.owns(source, i)) {
      obj[i] = clone(source[i]);
    }
    return obj;
  }
  else if (Array.is(source)) {
    var arr = [];
    for (var i = 0; i < source.length; ++i) {
      arr[i] = clone(source[i]);
    }
    return arr;
  }

  return source;
};

if (!Object.assign) {
  Object.assign = function assign(obj, extension) {
    if (arguments.length > 2) {
      for (var i = 0; i < arguments.length; ++i) {
        assign(obj, arguments[i]);
      }
    }
    else {
      for (var i in extension) if (Object.owns(extension, i)) {
        obj[i] = extension[i];
      }
    }
    return obj;
  };
}

Object.merge = function () {
  var out = {};
  for (var i = 0; i < arguments.length; ++i) {
    Object.assign(out, arguments[i]);
  }
  return out;
};

Object.each = function (obj, func) {
  for (var i in obj) if (Object.owns(obj, i)) {
    if (func.call(obj, obj[i], i, obj) === false) {
      break;
    }
  }
};
