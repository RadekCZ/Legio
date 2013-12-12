#module Legio ()

// Hlavní objekt frameworku
Legio() -> Legio;

// Funkce pro ověření hodnoty na undefined i null
var nil = Legio.nil = obj -> obj === undefined || obj === null;
Legio.or = (val, elseVal) -> nil(val) ? elseVal : val;

// Rošíření základní JS knihovny
// Object
var ObjectProto = Object.prototype, hasOwn = ObjectProto.hasOwnProperty, objToStr = ObjectProto.toString;

if (!Object.is) {
  Object.is = (a, b) -> {
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
Object.is = obj -> {
  if (arguments.length === 1) {
    return typeof obj === "object" && obj !== null;
  }
  
  return ObjectIs.apply(Object, arguments);
};

Object.owns = (obj, prop) -> hasOwn.call(obj, prop);

if (!Object.create) {
  Object.create = obj -> {
    var emptyFn = function () { };
    emptyFn.prototype = obj;
    return new emptyFn();
  };
}
if (!Object.keys) {
  Object.keys = obj -> {
    var result = [];
    #foreach (i in obj) {
      result.push(i);
    }
    return result;
  };
}
Object.isEmpty = Object.empty = obj -> {
  if (!nil(obj)) {
    #foreach (prop in obj) {
      return false;
    }
  }
  return true;
};
Object.clone = clone(source) -> {
  if (Object.is(source) && source !== global && !source.nodeType) {
    var obj = Array.is(source) ? [] : {};
    #foreach (i in source) {
      obj[i] = clone(source[i]);
    }
    return obj;
  }
  return source;
};
Object.extend = extend(obj, extension) -> {
  if (arguments.length > 2) {
    #foreach (i of arguments) {
      extend(obj, arguments[i]);
    }
  }
  else {
    #foreach (i in extension) {
      obj[i] = extension[i];
    }
  }
  return obj;
};
Object.merge = () -> {
  var out = {};
  #foreach (i of arguments) {
    Object.extend(out, arguments[i]);
  }
  return out;
};
Object.forEach = Object.each = (obj, func) -> {
  #foreach (i in obj) {
    if (func.call(obj, obj[i], i, obj)) {
      break;
    }
  }
};

// Array
if (!Array.isArray) {
  Array.isArray = array -> array instanceof Array || objToStr.call(array) === "[object Array]";
}
Array.is = Array.isArray;

var ArrayProto = Array.prototype,
    arraySlice = ArrayProto.slice;

Array.convert = Array.from = (obj, from = 0, to) -> {
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
  ArrayProto.indexOf = (value, from) -> {
    for (var i = from || 0, j = @length; i < j; ++i) {
      if (@[i] === value) {
        return i;
      }
    }
    return -1;
  };
}
if (!ArrayProto.lastIndexOf) {
  ArrayProto.lastIndexOf = (value, from) -> {
    if (nil(from)) {
      from = @length - 1;
    }
    for (var i = from; i >= 0; i--) {
      if (@[i] === value) {
        return i;
      }
    }
    return -1;
  };
}
if (!ArrayProto.forEach) {
  ArrayProto.forEach = (func, that) -> {
    #foreach (i of @) {
      func.call(that, @[i], i, @);
    }
  };
}
ArrayProto.each = (func, from, to) -> {
  for (var i = (from || 0); i < (to || @length); ++i) {
    if (func.call(@, @[i], i, @)) {
      break;
    }
  }
  return @;
};
if (!ArrayProto.filter) {
  ArrayProto.filter = (func, that) -> {
    var result = [];
    #foreach (i of @) {
      if (func.call(that, @[i], i, @)) {
        result.push(@[i]);
      }
    }
    return result;
  };
}
if (!ArrayProto.every) {
  ArrayProto.every = (func, that) -> {
    #foreach (i of @) {
      if (!func.call(that, @[i], i, @)) {
        return false;
      }
    }
    return true;
  };
}
if (!ArrayProto.some) {
  ArrayProto.some = (func, that) -> {
    #foreach (i of @) {
      if (func.call(that, @[i], i, @)) {
        return true;
      }
    }
    return false;
  };
}
if (!ArrayProto.map) {
  ArrayProto.map = (func, that) -> {
    var result = [];
    #foreach (i of @) {
      result.push(func.call(that, @[i], i, @));
    }
    return result;
  };
}
if (!ArrayProto.reduce) {
  ArrayProto.reduce = (func, current) -> {
    var i = 0;
    if (nil(current)) {
      current = @[i++];
    }
    for (; i < @length; ++i) {
      current = func(current, @[i], i, @);
    }
    return current;
  };
}
if (!ArrayProto.reduceRight) {
  ArrayProto.reduceRight = (func, current) -> {
    var i = @length - 1;
    if (nil(current)) {
      current = @[i--];
    }
    for (; i >= 0; --i) {
      current = func(current, @[i], i, @);
    }
    return current;
  };
}
ArrayProto.add = array -> @push.apply(@, array);

// Function
Function.is = obj -> obj instanceof Function || typeof obj === "function";

var FunctionProto = Function.prototype;

if (!FunctionProto.bind) {
  FunctionProto.bind = that -> {
    var func = @;
    
    if (that === undefined) {
      that = global;
    }
    
    if (arguments.length <= 1) {
      return () -> func.apply(that, arguments);
    }
    
    var args = Array.from(arguments, 1);
    return () -> func.apply(that, args.concat(Array.from(arguments)));
  };
}

FunctionProto.bindList = (that, args) -> {
  var finalArgs = [that];
  finalArgs.add(args);
  
  return @bind.apply(@, finalArgs);
};

FunctionProto.mixin = obj -> {
  var proto = @prototype;
  Object.extend(proto, obj);
  proto.constructor = @;
  return @;
};
FunctionProto.extend = FunctionProto.include = obj -> {
  var proto = @prototype;
  Object.extend(@, obj);
  @prototype = proto;
  return @;
};

// RegExp
var RegExp_specials = #/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g;
RegExp.escape = text -> text.replace(RegExp_specials, "\\$1");

// String
String.is = obj -> typeof obj === "string";

var StringProto = String.prototype;
if (!StringProto.trim) {
  var String_trim = #/^\s+|\s+$/g;
  StringProto.trim = () -> @replace(String_trim, "");
}
if (!StringProto.trimLeft) {
  var String_trimLeft = #/^\s+/g;
  StringProto.trimLeft = () -> @replace(String_trimLeft, "");
}
if (!StringProto.trimRight) {
  var String_trimRight = #/\s+$/g;
  StringProto.trimRight = () -> @replace(String_trimRight, "");
}

StringProto.replaceAll = (from, to) -> @split(from).join(to);

var pInt = parseInt, pFloat = parseFloat;
StringProto.toInt = radix -> pInt(@, radix || 10);
StringProto.toFloat = () -> pFloat(@);

if (!StringProto.repeat) {
  StringProto.repeat = times -> {
    var res = "";
    for (var i = 0; i < times; ++i) {
      res += @;
    }
    return res;
  };
}

if (!StringProto.contains) {
  StringProto.contains = (str, index) -> @indexOf(str, index) !== -1;
}
if (!StringProto.startsWith) {
  StringProto.startsWith = (str, index = 0) -> @indexOf(str, index) === index;
}
if (!StringProto.endsWith) {
  StringProto.endsWith = (str, index = @length) -> {
    index -= str.length;
    
    return @lastIndexOf(str, index) === index;
  };
}

// Math
Math.rand = (from, to) -> from + Math.floor(Math.random() * (to - from + 1));

if (!Math.sign) {
  Math.sign = num -> num === 0 ? 0 : (num > 0 ? 1 : -1);
}

// Number
Number.is = obj -> typeof obj === "number";
Number.parseInt = pInt;
Number.parse = pFloat;

if (!Number.isNaN) {
  Number.isNaN = val -> val !== val;
}
Number.isFinite = isFinite;
Number.isNumeric = num -> (Number.is(num) || (String.is(num) && num !== "")) && Number.isFinite(num);

var NumberProto = Number.prototype;
NumberProto.limit = (from, to) -> {
  if (@ < from) {
    return from;
  }
  if (@ > to) {
    return to;
  }
  return @;
};
NumberProto.toInt = () -> @ | 0;
NumberProto.toFloat = () -> @;

// Matematické funkce do prototypu čísla
NumberProto.mod = n -> ((@ % n) + n) % n;
NumberProto.abs = () -> Math.abs(@);
NumberProto.round = dec -> {
  if (dec) {
    dec = Math.pow(10, dec);
    return Math.round(@ * dec) / dec;
  }
  return Math.round(@);
};
NumberProto.floor = () -> Math.floor(@);
NumberProto.ceil = () -> Math.ceil(@);
NumberProto.pow = exp -> Math.pow(@, Number.is(exp) ? exp : 2);
NumberProto.sqrt = () -> Math.sqrt(@);
NumberProto.log = base -> base ? Math.log(@) / Math.log(base) : Math.log(@);
NumberProto.toRad = () -> @ * Math.PI / 180;
NumberProto.toDeg = () -> @ * 180 / Math.PI;

// Boolean
Boolean.is = obj -> typeof obj === "boolean";

// Date
if (!Date.now) {
  Date.now = () -> +(new Date());
}

#export Legio;
