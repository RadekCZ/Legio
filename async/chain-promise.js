'use strict';
var
construct = require("../oop/construct"),
Promise = require("./promise");

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

module.exports = ChainPromise;
