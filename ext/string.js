'use strict';

var
StringProto = String.prototype,
pInt = parseInt,
pFloat = parseFloat;

String.is = function (obj) { return typeof obj === "string"; };

if (!StringProto.trim) {
  var trimRegex = /^\s+|\s+$/g;
  StringProto.trim = function () { return this.replace(trimRegex, ""); };
}
if (!StringProto.trimLeft) {
  var trimLeftRegex = /^\s+/g;
  StringProto.trimLeft = function () { return this.replace(trimLeftRegex, ""); };
}
if (!StringProto.trimRight) {
  var trimRightRegex = /\s+$/g;
  StringProto.trimRight = function () { return this.replace(trimRightRegex, ""); };
}

StringProto.replaceAll = function (from, to) { return this.split(from).join(to); };

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
  StringProto.startsWith = function (str, index) {
    index === undefined && (index = 0);

    return this.substr(index, str.length) === str;
  };
}
if (!StringProto.endsWith) {
  StringProto.endsWith = function (str, index) {
    index === undefined && (index = this.length);

    index -= str.length;

    return this.substr(index, str.length) === str;
  };
}
