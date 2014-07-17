'use strict';

var
NumberProto = Number.prototype,
pInt = parseInt,
pFloat = parseFloat,
isFin = isFinite;

Number.is = function (obj) { return typeof obj === "number"; };
Number.parseInt = pInt;
Number.parse = Number.parseFloat = pFloat;

Number.Infinity = Infinity;

Number.global = {
  isNaN: isNaN,
  isFinite: isFin
};

if (!Number.isNaN) {
  Number.isNaN = function (val) { return val !== val; };
}
if (!Number.isFinite) {
  Number.isFinite = function (val) {
    return Number.is(val) && isFin(val);
  };
}
if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return num.toInt() === num;
  };
}

Number.isNumeric = function (num) {
  if (Number.is(num)) {
    return Number.isFinite(num);
  }
  else if (String.is(num) && num !== "") {
    return Number.isFinite(Number.parse(num));
  }
  return false;
};

NumberProto.limit = function (from, to) { return Math.min(Math.max(this, from), to); };

NumberProto.toInt = function () { return Math.trunc(this); };
NumberProto.toFloat = function () { return this; };

// Math functions added to the Number's prototype
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
NumberProto.pow = function (exp) {
  exp === undefined && (exp = 2);

  return Math.pow(this, exp);
};
NumberProto.sqrt = function () { return Math.sqrt(this); };
NumberProto.log = function (base) { return base ? Math.log(this) / Math.log(base) : Math.log(this); };
NumberProto.toRad = function () { return this * Math.PI / 180; };
NumberProto.toDeg = function () { return this * 180 / Math.PI; };
