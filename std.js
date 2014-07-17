'use strict';

// The main object
function Legio() { return Legio; }

// Functions for handling null & undefined values together
var nil = Legio.nil = function (obj) { return obj === undefined || obj === null; };
Legio.or = function (val, elseVal) { return nil(val) ? elseVal : val; };

// Extensions of the base library
require("./ext/object");
require("./ext/array");
require("./ext/function");
require("./ext/regexp");
require("./ext/string");
require("./ext/math");
require("./ext/number");
require("./ext/boolean");
require("./ext/date");

// The setImmediate implementation
require("setimmediate");

module.exports = Legio;
