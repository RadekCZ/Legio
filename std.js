(function (global, undefined) {
"use strict";
function definition() {

// Hlavní objekt frameworku
function Legio() { return Legio; };

// Funkce pro ověření hodnoty na undefined i null
var nil = Legio.nil = function (obj) { return obj === undefined || obj === null; };
Legio.or = function (val, elseVal) { return nil(val) ? elseVal : val; };

// Rošíření základní JS knihovny
// Object
var ObjectProto = Object.prototype, hasOwn = ObjectProto.hasOwnProperty, objToStr = ObjectProto.toString;

if (!Object.is) {
  Object.is = function (a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a !== a && b !== b) {
      return true;
    }
    return a === b;
  };
}

var ObjectIs = Object.is;
Object.is = function (obj) {
  if (arguments.length === 1) {
    return typeof obj === "object" && obj !== null;
  }
  
  return ObjectIs.apply(Object, arguments);
};

Object.owns = function (obj, prop) { return hasOwn.call(obj, prop); };

if (!Object.create) {
  Object.create = function (obj) {
    var emptyFn = function () { };
    emptyFn.prototype = obj;
    return new emptyFn();
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
Object.isEmpty = Object.empty = function (obj) {
  if (!nil(obj)) {
    for (var prop in obj) if (Object.owns(obj, prop)) {
      return false;
    }
  }
  return true;
};
Object.clone = function clone(source) {
  if (Object.is(source) && source !== global && !source.nodeType) {
    var obj = Array.is(source) ? [] : {};
    for (var i in source) if (Object.owns(source, i)) {
      obj[i] = clone(source[i]);
    }
    return obj;
  }
  return source;
};
Object.extend = function extend(obj, extension) {
  if (arguments.length > 2) {
    for (var i = 0; i < arguments.length; ++i) {
      extend(obj, arguments[i]);
    }
  }
  else {
    for (var i in extension) if (Object.owns(extension, i)) {
      obj[i] = extension[i];
    }
  }
  return obj;
};
Object.merge = function () {
  var out = {};
  for (var i = 0; i < arguments.length; ++i) {
    Object.extend(out, arguments[i]);
  }
  return out;
};
Object.forEach = Object.each = function (obj, func) {
  for (var i in obj) if (Object.owns(obj, i)) {
    if (func.call(obj, obj[i], i, obj)) {
      break;
    }
  }
};

// Array
if (!Array.isArray) {
  Array.isArray = function (array) { return array instanceof Array || objToStr.call(array) === "[object Array]"; };
}
Array.is = Array.isArray;

var ArrayProto = Array.prototype,
    arraySlice = ArrayProto.slice;

Array.convert = Array.from = function (obj, from, to) { if (from === undefined) { from = 0; } 
  if (obj) {
    if (!to) { to = obj.length; }
    
    try {
      return arraySlice.call(obj, from, to);
    }
    catch (ex) {
      var array = [];
      for (var i = from; i < to; ++i) {
        array.push(obj[i]);
      }
      return array;
    }
  }
  return [];
};

if (!ArrayProto.indexOf) {
  ArrayProto.indexOf = function (value, from) {
    for (var i = from || 0, j = this.length; i < j; ++i) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
}
if (!ArrayProto.lastIndexOf) {
  ArrayProto.lastIndexOf = function (value, from) {
    if (nil(from)) {
      from = this.length - 1;
    }
    for (var i = from; i >= 0; i--) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
}
if (!ArrayProto.forEach) {
  ArrayProto.forEach = function (func, that) {
    for (var i = 0; i < this.length; ++i) {
      func.call(that, this[i], i, this);
    }
  };
}
ArrayProto.each = function (func, from, to) {
  for (var i = (from || 0); i < (to || this.length); ++i) {
    if (func.call(this, this[i], i, this)) {
      break;
    }
  }
  return this;
};
if (!ArrayProto.filter) {
  ArrayProto.filter = function (func, that) {
    var result = [];
    for (var i = 0; i < this.length; ++i) {
      if (func.call(that, this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}
if (!ArrayProto.every) {
  ArrayProto.every = function (func, that) {
    for (var i = 0; i < this.length; ++i) {
      if (!func.call(that, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}
if (!ArrayProto.some) {
  ArrayProto.some = function (func, that) {
    for (var i = 0; i < this.length; ++i) {
      if (func.call(that, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}
if (!ArrayProto.map) {
  ArrayProto.map = function (func, that) {
    var result = [];
    for (var i = 0; i < this.length; ++i) {
      result.push(func.call(that, this[i], i, this));
    }
    return result;
  };
}
if (!ArrayProto.reduce) {
  ArrayProto.reduce = function (func, current) {
    var i = 0;
    if (nil(current)) {
      current = this[i++];
    }
    for (; i < this.length; ++i) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}
if (!ArrayProto.reduceRight) {
  ArrayProto.reduceRight = function (func, current) {
    var i = this.length - 1;
    if (nil(current)) {
      current = this[i--];
    }
    for (; i >= 0; --i) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}
ArrayProto.add = function (array) { return this.push.apply(this, array); };

// Function
Function.is = function (obj) { return obj instanceof Function || typeof obj === "function"; };

var FunctionProto = Function.prototype;

if (!FunctionProto.bind) {
  FunctionProto.bind = function (that) {
    var func = this;
    
    if (that === undefined) {
      that = global;
    }
    
    if (arguments.length <= 1) {
      return function () { return func.apply(that, arguments); };
    }
    
    var args = Array.from(arguments, 1);
    return function () { return func.apply(that, args.concat(Array.from(arguments))); };
  };
}

FunctionProto.bindList = function (that, args) {
  var finalArgs = [that];
  finalArgs.add(args);
  
  return this.bind.apply(this, finalArgs);
};

FunctionProto.mixin = function (obj) {
  var proto = this.prototype;
  Object.extend(proto, obj);
  proto.constructor = this;
  return this;
};
FunctionProto.extend = FunctionProto.include = function (obj) {
  var proto = this.prototype;
  Object.extend(this, obj);
  this.prototype = proto;
  return this;
};

// RegExp
var RegExp_specials = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g;
RegExp.escape = function (text) { return text.replace(RegExp_specials, "\\$1"); };

// String
String.is = function (obj) { return typeof obj === "string"; };

var StringProto = String.prototype;
if (!StringProto.trim) {
  var String_trim = /^\s+|\s+$/g;
  StringProto.trim = function () { return this.replace(String_trim, ""); };
}
if (!StringProto.trimLeft) {
  var String_trimLeft = /^\s+/g;
  StringProto.trimLeft = function () { return this.replace(String_trimLeft, ""); };
}
if (!StringProto.trimRight) {
  var String_trimRight = /\s+$/g;
  StringProto.trimRight = function () { return this.replace(String_trimRight, ""); };
}

StringProto.replaceAll = function (from, to) { return this.split(from).join(to); };

var pInt = parseInt, pFloat = parseFloat;
StringProto.toInt = function (radix) { return pInt(this, radix || 10); };
StringProto.toFloat = function () { return pFloat(this); };

if (!StringProto.repeat) {
  StringProto.repeat = function (times) {
    var res = "";
    for (var i = 0; i < times; ++i) {
      res += this;
    }
    return res;
  };
}

if (!StringProto.contains) {
  StringProto.contains = function (str, index) { return this.indexOf(str, index) !== -1; };
}
if (!StringProto.startsWith) {
  StringProto.startsWith = function (str, index) { if (index === undefined) { index = 0; }  return this.indexOf(str, index) === index; };
}
if (!StringProto.endsWith) {
  StringProto.endsWith = function (str, index) { if (index === undefined) { index = this.length; } 
    index -= str.length;
    
    return this.lastIndexOf(str, index) === index;
  };
}

// Math
Math.rand = function (from, to) { return from + Math.floor(Math.random() * (to - from + 1)); };

if (!Math.sign) {
  Math.sign = function (num) { return num === 0 ? 0 : (num > 0 ? 1 : -1); };
}

// Number
Number.is = function (obj) { return typeof obj === "number"; };
Number.parseInt = pInt;
Number.parse = pFloat;

if (!Number.isNaN) {
  Number.isNaN = function (val) { return val !== val; };
}
Number.isFinite = isFinite;
Number.isNumeric = function (num) { return (Number.is(num) || (String.is(num) && num !== "")) && Number.isFinite(num); };

var NumberProto = Number.prototype;
NumberProto.limit = function (from, to) {
  if (this < from) {
    return from;
  }
  if (this > to) {
    return to;
  }
  return this;
};
NumberProto.toInt = function () { return this | 0; };
NumberProto.toFloat = function () { return this; };

// Matematické funkce do prototypu čísla
NumberProto.mod = function (n) { return ((this % n) + n) % n; };
NumberProto.abs = function () { return Math.abs(this); };
NumberProto.round = function (dec) {
  if (dec) {
    dec = Math.pow(10, dec);
    return Math.round(this * dec) / dec;
  }
  return Math.round(this);
};
NumberProto.floor = function () { return Math.floor(this); };
NumberProto.ceil = function () { return Math.ceil(this); };
NumberProto.pow = function (exp) { return Math.pow(this, Number.is(exp) ? exp : 2); };
NumberProto.sqrt = function () { return Math.sqrt(this); };
NumberProto.log = function (base) { return base ? Math.log(this) / Math.log(base) : Math.log(this); };
NumberProto.toRad = function () { return this * Math.PI / 180; };
NumberProto.toDeg = function () { return this * 180 / Math.PI; };

// Boolean
Boolean.is = function (obj) { return typeof obj === "boolean"; };

// Date
if (!Date.now) {
  Date.now = function () { return +(new Date()); };
}

return Legio;
}
if (typeof module === "object" && module.exports) {
module.exports = definition();
}
else if (typeof define === "function" && define.amd) {
define([], definition);
}
else {
global.Legio = definition();
}
})(this);