(function (global, undefined) {
"use strict";
function definition(Legio) {

var enc = encodeURI, dec = decodeURI, encC = encodeURIComponent, decC = decodeURIComponent;

var URI = {
  encode: enc,
  decode: dec,
  encodeComponent: encC,
  decodeComponent: decC,
  
  create: function (obj) {
    var str = "", ch = "";
    
    for (var i in obj) if (Object.owns(obj, i)) {
      str += ch + encC(i) + "=" + encC(obj[i]);
      ch = "&";
    }
    
    return str; // .slice(0, -1);
  },
  
  parse: function (str) {
    var obj = {}, parts = str.split("&"), part;
    
    for (var i = 0; i < parts.length; ++i) {
      part = parts[i].split("=");
      obj[decC(part[0])] = decC(part[1]);
    }
    
    return obj;
  }
};

URI.stringify = URI.create;

return URI;
}
if (typeof module === "object" && module.exports) {
module.exports = definition(require("../std"));
}
else if (typeof define === "function" && define.amd) {
define(["../std"], definition);
}
else {
global.Legio.URI = definition(global.Legio);
}
})(this);