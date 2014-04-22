'use strict';
var
Legio = require("../std"),
construct = require("../oop/construct");

var Interval = construct({
  init: function (func, time, wrap) {
    var self = this;

    this._count = 0;
    this._func = wrap === false ? func : function () {
      func.call(self, ++self._count);
    };

    this._time = time;
  },

  proto: {
    activate: function (immediately, time) {
      time === undefined && (time = this._time);

      if (immediately) {
        global.setTimeout(this._func, 0);
      }
      this._id = global.setInterval(this._func, time);
    },
    suspend: function () {
      global.clearInterval(this._id);
    }
  }
});

module.exports = Interval;
