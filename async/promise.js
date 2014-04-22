'use strict';
var
Legio = require("../std"),
construct = require("../oop/construct");

var Promise = construct({
  init: function (that) {
    this._that = that;

    this._onResolve = [];
    this._onReject = [];
    this._onNotify = [];
  },

  proto: {
    pending: true,
    resolved: false,
    rejected: false,

    then: function (onResolve, onReject, onNotify) {
      if (Function.is(onResolve)) {
        if (this.pending) {
          this._onResolve.push(onResolve);
        }
        else if (this.resolved) {
          onResolve.apply(this._that, this._args);
        }
      }

      if (Function.is(onReject)) {
        if (this.pending) {
          this._onReject.push(onReject);
        }
        else if (this.rejected) {
          onReject.apply(this._that, this._args);
        }
      }

      if (Function.is(onNotify)) {
        if (this.pending) {
          this._onNotify.push(onNotify);
        }
      }

      return this;
    },

    resolve: function () {
      if (this.pending) {
        this.resolved = true;
        this._args = arguments;

        this._startEvent(this._onResolve, this._args);
        this._clear();

        return true;
      }
      return false;
    },

    reject: function () {
      if (this.pending) {
        this.rejected = true;
        this._args = arguments;

        this._startEvent(this._onReject, this._args);
        this._clear();

        return true;
      }
      return false;
    },

    notify: function () {
      if (this.pending) {
        this._startEvent(this._onNotify, arguments);

        return true;
      }
      return false;
    },

    bindResolve: function () {
      return this.resolve.bindList(this, arguments);
    },
    bindReject: function () {
      return this.reject.bindList(this, arguments);
    },
    bindNotify: function () {
      return this.notify.bindList(this, arguments);
    },

    _startEvent: function (/*Function[]*/ callbacks, args) {
      for (var i = 0, j = callbacks.length; i < j; ++i) {
        callbacks[i].apply(this._that, args);
      }
    },

    _clear: function () {
      this.pending = false;

      delete this.onResolve;
      delete this.onReject;
    }
  },

  own: {
    when: function (list) {
      var
      wrapper = new Promise(list),
      len = list.length,

      reject = wrapper.bindReject(),

      count = len,
      resolvePart = function () {
        if (wrapper.pending && --count === 0) {
          wrapper.resolve();
        }
      };

      for (var i = 0; i < len; ++i) {
        list[i].then(resolvePart, reject);
      }

      return wrapper;
    }
  }
});

module.exports = Promise;
