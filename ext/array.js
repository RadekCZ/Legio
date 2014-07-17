'use strict';

var
ObjectProto = Object.prototype,
objToStr = ObjectProto.toString,
ArrayProto = Array.prototype,
arraySlice = ArrayProto.slice,
arrayPush = ArrayProto.push;

if (!Array.isArray) {
  Array.isArray = function (array) { return objToStr.call(array) === "[object Array]"; };
}
Array.is = Array.isArray;

Array.from = function (obj, from, to) {
  from === undefined && (from = 0);

  if (obj) {
    to === undefined && (to = obj.length);

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
    from === undefined && (from = 0);

    for (var i = from, j = this.length; i < j; ++i) {
      if (this[i] === value) {
        return i;
      }
    }

    return -1;
  };
}
if (!ArrayProto.lastIndexOf) {
  ArrayProto.lastIndexOf = function (value, from) {
    from === undefined && (from = this.length - 1);

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
    for (var i = 0; i < this.length; ++i) if (i in this) {
      func.call(that, this[i], i, this);
    }
  };
}
ArrayProto.each = function (func, from, to) {
  from === undefined && (from = 0);
  to === undefined && (to = this.length);

  for (var i = from; i < to; ++i) {
    if (func.call(this, this[i], i, this) === false) {
      break;
    }
  }
  return this;
};

if (!ArrayProto.filter) {
  ArrayProto.filter = function (func, that) {
    var result = [];
    for (var i = 0; i < this.length; ++i) if (i in this) {
      if (func.call(that, this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
}
if (!ArrayProto.every) {
  ArrayProto.every = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      if (!func.call(that, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}
if (!ArrayProto.some) {
  ArrayProto.some = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
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
    for (var i = 0; i < this.length; ++i) if (i in this) {
      result.push(func.call(that, this[i], i, this));
    }
    return result;
  };
}
if (!ArrayProto.reduce) {
  ArrayProto.reduce = function (func, current) {
    var i = 0;
    current === undefined && (current = this[i++]);

    for (; i < this.length; ++i) if (i in this) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}
if (!ArrayProto.reduceRight) {
  ArrayProto.reduceRight = function (func, current) {
    var i = this.length - 1;
    current === undefined && (current = this[i--]);

    for (; i >= 0; --i) if (i in this) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}

if (!ArrayProto.find) {
  ArrayProto.find = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      var item = this[i];

      if (func.call(that, item, i, this)) {
        return item;
      }
    }
  };
}
if (!ArrayProto.findIndex) {
  ArrayProto.findIndex = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      var item = this[i];

      if (func.call(that, item, i, this)) {
        return i;
      }
    }

    return -1;
  };
}

ArrayProto.add = function (array) {
  arrayPush.apply(this, array);

  return this;
};
ArrayProto.tack = function () {
  arrayPush.apply(this, arguments);

  return this;
};

ArrayProto.remove = function (item) {
  var ind = this.indexOf(item);
  if (ind !== -1) {
    this.splice(ind, 1);
  }
};
