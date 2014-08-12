'use strict';

/** @class Array */

var
ObjectProto = Object.prototype,
objToStr = ObjectProto.toString,
ArrayProto = Array.prototype,
arraySlice = ArrayProto.slice,
arrayPush = ArrayProto.push,
arraySplice = ArrayProto.splice;

if (!Array.isArray || Object.DEBUG) {
  /**
   * Alias for {@link Array.is}
   * @param {*} value
   * @returns {Boolean}
   */
  Array.isArray = function (array) { return objToStr.call(array) === "[object Array]"; };
}
/**
 * Determines whether the given value is an array.
 * @function
 * @param {*} value
 * @returns {Boolean}
 */
Array.is = Array.isArray;

if (!Array.from || Object.DEBUG) {
//  Array.from = function (obj, from, to) {
//    from === undefined && (from = 0);
//
//    if (obj) {
//      to === undefined && (to = obj.length);
//
//      try {
//        return arraySlice.call(obj, from, to);
//      }
//      catch (ex) {
//        var array = [];
//        for (var i = from; i < to; ++i) {
//          array.push(obj[i]);
//        }
//        return array;
//      }
//    }
//
//    return [];
//  };

  /**
   * @param {Object} object Array-like object
   * @param {Function} [mapFunction] (this = that, value, key)
   * @param {*} [that]
   * @returns {Array}
   */
  Array.from = function (obj, mapFn, that) {
    if (obj === null || obj === undefined) {
      throw TypeError("Array.from requires an object.");
    }

    var
    isMapFn = mapFn !== undefined,
    len = Number.parse(obj.length).trunc() || 0,
    array = new Array(len);

    for (var i = 0; i < len; ++i) {
      array[i] = isMapFn ? mapFn.call(that, obj[i], i) : obj[i];
    }

    return array;
  };
}

/**
 * Adds items to the array.
 * @alias Array#add
 * @param {Array}
 * @returns {this}
 */
ArrayProto.add = function (items) {
  arrayPush.apply(this, items);

  return this;
};

/**
 * Similar to {@link Array#add}, but accepts items as arguments.
 * @alias Array#tack
 * @param {...*} items
 * @returns {this}
 */
ArrayProto.tack = function () {
  arrayPush.apply(this, arguments);

  return this;
};

/**
 * Removes the item (if it is in the array) from the array.
 * @alias Array#remove
 * @param {*}
 * @returns {this}
 */
ArrayProto.remove = function (item) {
  var ind = this.indexOf(item);
  if (ind !== -1) {
    this.splice(ind, 1);
  }

  return this;
};

/**
 * Inserts the given items in the array at the given index.
 * @alias Array#insert
 * @param {Number}
 * @param {Array}
 * @returns {this}
 */
ArrayProto.insert = function (index, items) {
  arraySplice.apply(this, [index, 0].add(items));

  return this;
};

/**
 * @alias Array#first
 * @returns {*}
 */
ArrayProto.first = function () {
  return this[0];
};

/**
 * @alias Array#last
 * @returns {*}
 */
ArrayProto.last = function () {
  return this[this.length - 1];
};

/**
 * Executes the given function for every item in the array.
 * @alias Array#each
 * @param {Function} callback (this = this, value, index, array = this)
 * @param {Number} [fromIndex] inclusive
 * @param {Number} [toIndex] exclusive
 * @returns {this}
 */
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

if (!ArrayProto.indexOf || Object.DEBUG) {
  /**
   * @alias Array#indexOf
   * @param {*}
   * @param {Number=}
   * @returns {Number}
   */
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
if (!ArrayProto.lastIndexOf || Object.DEBUG) {
  /**
   * @alias Array#lastIndexOf
   * @param {*}
   * @param {Number=}
   * @returns {Number}
   */
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

/**
 * @callback Array.Callback
 * @this that
 * @param {*} value
 * @param {Number} index
 * @param {Array} array
 * @returns {undefined|Boolean|*}
 */
/**
 * @callback Array.ReduceCallback
 * @param {*} current
 * @param {*} value
 * @param {Number} index
 * @param {Array} array
 * @returns {*} Passed as the next `current`.
 */

if (!ArrayProto.forEach || Object.DEBUG) {
  /**
   * @alias Array#forEach
   * @param {Array.Callback} callback
   * @param {*} [that]
   */
  ArrayProto.forEach = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      func.call(that, this[i], i, this);
    }
  };
}
if (!ArrayProto.filter || Object.DEBUG) {
  /**
   * @alias Array#filter
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {Array}
   */
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
if (!ArrayProto.every || Object.DEBUG) {
  /**
   * @alias Array#every
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {Boolean}
   */
  ArrayProto.every = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      if (!func.call(that, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
}
if (!ArrayProto.some || Object.DEBUG) {
  /**
   * @alias Array#some
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {Boolean}
   */
  ArrayProto.some = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      if (func.call(that, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}
if (!ArrayProto.map || Object.DEBUG) {
  /**
   * @alias Array#map
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {Array}
   */
  ArrayProto.map = function (func, that) {
    var result = [];
    for (var i = 0; i < this.length; ++i) if (i in this) {
      result.push(func.call(that, this[i], i, this));
    }
    return result;
  };
}
if (!ArrayProto.reduce || Object.DEBUG) {
  /**
   * @alias Array#reduce
   * @param {Array.ReduceCallback} callback
   * @param {*} [current=this.first()]
   * @returns {Array}
   */
  ArrayProto.reduce = function (func, current) {
    var i = 0;
    current === undefined && (current = this[i++]);

    for (; i < this.length; ++i) if (i in this) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}
if (!ArrayProto.reduceRight || Object.DEBUG) {
  /**
   * @alias Array#reduceRight
   * @param {Array.ReduceCallback} callback
   * @param {*} [current=this.last()]
   * @returns {Array}
   */
  ArrayProto.reduceRight = function (func, current) {
    var i = this.length - 1;
    current === undefined && (current = this[i--]);

    for (; i >= 0; --i) if (i in this) {
      current = func(current, this[i], i, this);
    }
    return current;
  };
}

if (!ArrayProto.find || Object.DEBUG) {
  /**
   * @alias Array#find
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {*}
   */
  ArrayProto.find = function (func, that) {
    for (var i = 0; i < this.length; ++i) if (i in this) {
      var item = this[i];

      if (func.call(that, item, i, this)) {
        return item;
      }
    }
  };
}
if (!ArrayProto.findIndex || Object.DEBUG) {
  /**
   * @alias Array#findIndex
   * @param {Array.Callback} callback
   * @param {*} [that]
   * @returns {Number}
   */
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
