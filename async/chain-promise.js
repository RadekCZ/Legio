(function (global, undefined) {
  "use strict";
  
  function definition(construct, Promise) {
    
    var ChainPromise = construct({
      inherits: Promise,
      
      init: function (that) {
        this.superInit(that);
      },
      members: {
        then: function (/*Function*/ onResolve, /*Function*/ onReject, /*Function*/ onNotify) {
          var prom = new ChainPromise(this._that);
          
          if (Function.is(onResolve)) {
            onResolve = onResolve.bind(this._that, prom);
          }
          if (Function.is(onReject)) {
            onReject = onReject.bind(this._that, prom);
          }
          
          this.superMethod("then", [onResolve, onReject, onNotify]);
          
          return prom;
        }
      }
    });
    
    return ChainPromise;
  }
  
  // Final export
  if (typeof module !== "undefined") {
    module.exports = definition(require("../oop/construct"), require("./promise"));
  }
  else if (typeof define !== "undefined") {
    define(["../oop/construct", "./promise"], definition);
  }
})(this);