'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Function", function () {
  describe(".is()", function () {
    it("determines whether the given value is a function", function () {
      expect(Function.is(function () {})).to.be.ok();
      expect(Function.is(new Function())).to.be.ok();
      expect(Function.is(Function())).to.be.ok();
      expect(Function.is(Object.create(Function.prototype))).not.to.be.ok();
      expect(Function.is(Object.create(function () {}))).not.to.be.ok();
      expect(Function.is({})).not.to.be.ok();

      var fn = function () {};
      fn.__proto__ = {};

      expect(Function.is(fn)).to.be.ok();
    });
  });

  describe("#bind() & #bindArray()", function () {
    it("returns a new function with bound `this` and arguments", function () {
      (function (a) {
        expect(a).to.be(1);
      }.bind(null, 1))();

      (function (a, b) {
        expect(a + b).to.be(3);
      }.bindArray(null, [1, 2]))();

      var obj = {};
      (function () {
        expect(this).to.be(obj);
      }.bind(obj))();
    });
  });

  describe("#tie() & #tieArray()", function () {
    it("returns a new function with tied arguments", function () {
      var obj = {};

      (function (a) {
        expect(a).to.be(1);
        expect(this).to.be(obj);
      }.tie(1)).call(obj);

      (function (a, b) {
        expect(a + b).to.be(3);
        expect(this).to.be(obj);
      }.tieArray([1, 2])).call(obj);
    });
  });

  describe("#mixin() & #assign()", function () {
    it("extends the function (or its prototype) with given values", function () {
      var fn = function () {};

      fn.assign({ a: 1, b: 2 });
      expect(fn.a).to.be(1);
      expect(fn.b).to.be(2);

      fn.mixin({ a: 3, b: 4 });

      var obj = new fn();

      expect(obj.a).to.be(3);
      expect(obj.b).to.be(4);

      fn.assign({ prototype: null });

      expect(fn.prototype).not.to.be(null);

      fn.mixin({ constructor: null });

      expect(obj.constructor).not.to.be(null);
    });
  });
});
