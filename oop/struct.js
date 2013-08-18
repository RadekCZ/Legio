(function (global, undefined) {
"use strict";
function definition(Legio) {

// Main function which generates a special constructor
function struct() {
  var keys = arguments;
  return function () {
    fill(this, keys, arguments);
  };
}

// Function that fills properties by arguments
function fill(obj, keys, values) {
  for (var i = 0; i < keys.length; ++i) {
    obj[keys[i]] = values[i];
  }
}

return struct;
}
if (typeof module === "object" && module.exports) {
module.exports = definition(require("../std"));
}
else if (typeof define === "function" && define.amd) {
define(["../std"], definition);
}
else {
global.Legio.struct = definition(global.Legio);
}
})(this);