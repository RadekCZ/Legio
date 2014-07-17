'use strict';

Math.rand = function (from, to) { return from + Math.floor(Math.random() * (to - from + 1)); };

if (!Math.sign) {
  Math.sign = function (num) { return num === 0 ? 0 : (num > 0 ? 1 : -1); };
}

if (!Math.trunc) {
  Math.trunc = function (num) { return Math[num < 0 ? "ceil" : "floor"](num); };
}
