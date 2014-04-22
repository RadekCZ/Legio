'use strict';
var
Legio = require("../std"),
construct = require("../oop/construct"),
Promise = require("./promise");

var ChainPromise = construct({
  inherit: Promise,

  init: function (that) {
    this.superInit(that);
  },

  proto: {
    then: function (onResolve, onReject, onNotify) {
      var prom = new ChainPromise(this._that);

      if (Function.is(onResolve)) {
        onResolve = onResolve.bind(this._that, prom);
      }
      if (Function.is(onReject)) {
        onReject = onReject.bind(this._that, prom);
      }

      this.superCall("then", [onResolve, onReject, onNotify]);

      return prom;
    }
  }
});

module.exports = ChainPromise;
