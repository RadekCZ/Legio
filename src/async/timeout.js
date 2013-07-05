(function (global, undefined) {
  "use strict";
  
  function definition(Legio, construct, Promise) {
    
    var Timeout = construct({
      init: function (func, time, wrap) {
        this._func = wrap === false ? func : func.bind(this);
        this._time = time;
      },
      members: {
        start: function (time) {
          this._id = global.setTimeout(this._func, Legio.or(time, this._time));
        },
        cancel: function () {
          global.clearTimeout(this._id);
        }
      },
      statics: {
        start: function (time, that) {
          var prom = new Promise(that),
              id = global.setTimeout(prom.bindResolve(), time);
          
          prom.then(null, function () {
            global.clearTimeout(id);
          });
          
          return prom;
        }
      }
    });
    
    return Timeout;
  }
  
  // Final export
  if (typeof module !== "undefined") {
    module.exports = definition(require("../std"), require("../oop/construct"), require("./promise"));
  }
  else if (typeof define !== "undefined") {
    define(["../std", "../oop/construct", "./promise"], definition);
  }
})(this);