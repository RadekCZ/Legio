'use strict';
var
Legio = require("../std"),
construct = require("../oop/construct"),
Promise = require("./promise");

var Timeout = construct({
  init: function (func, time, wrap) {
    this._func = wrap === false ? func : func.bind(this);
    this._time = time;
  },

  proto: {
    start: function (time) {
      time === undefined && (time = this.time);

      this._id = global.setTimeout(this._func, time);
    },
    cancel: function () {
      global.clearTimeout(this._id);
    }
  },

  own: {
    start: function (time, that) {
      var
      prom = new Promise(that),
      id = global.setTimeout(prom.bindFulfill(), time);

      prom.then(null, function () {
        global.clearTimeout(id);
      });

      return prom;
    }
  }
});

module.exports = Timeout;
