(function (global, undefined) {
"use strict";
function definition(Legio) {

// Function which simulates an interface
function draft(inherits, data) {
  if (!data) {
    data = inherits;
  }
  else {
    data = Object.merge(inherits._interface, data);
  }
  
  var check = checkObject.bind(data);
  check._interface = data;
  
  return check;
}

function checkObject(obj) {
  var data = this;
  
  for (var i in data) if (Object.owns(data, i)) {
    var T = data[i], val = obj[i];
    
    if (T === null) {
      if (val === undefined) {
        return false;
      }
    }
    else if (T === Function || T === String || T === Number || T === Boolean || T === Array || T === Object) {
      if (!T.is(val)) {
        return false;
      }
    }
    else if (Function.is(T) && T._interface) {
      if (!T(val)) {
        return false;
      }
    }
    else if (!(val instanceof T)) {
      return false;
    }
  }
  
  return true;
}

return draft;
}
if (typeof module === "object" && module.exports) {
module.exports = definition(require("../std"));
}
else if (typeof define === "function" && define.amd) {
define(["../std"], definition);
}
else {
global.Legio.draft = definition(global.Legio);
}
})(this);