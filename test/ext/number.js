'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Number", function () {
  describe(".is()", function () {
    it("determines if the given value is a number", function () {
      expect(Number.is(10)).to.be.ok();
      expect(Number.is(NaN)).to.be.ok();
      expect(Number.is(Infinity)).to.be.ok();
      expect(Number.is(new Number(10))).not.to.be.ok();
      expect(Number.is(undefined)).not.to.be.ok();
      expect(Number.is("10")).not.to.be.ok();
      expect(Number.is({})).not.to.be.ok();
    });
  });

  describe(".isNaN()", function () {
    it("checks if the value passed equals to NaN", function () {
      expect(Number.isNaN(NaN)).to.be.ok();
      expect(Number.isNaN(42)).not.to.be.ok();
      expect(Number.isNaN(Infinity)).not.to.be.ok();
      expect(Number.isNaN("some non-parsable value")).not.to.be.ok();
    });
  });

  describe(".isFinite()", function () {
    it("checks if the value passed is a finite number", function () {
      expect(Number.isFinite(42)).to.be.ok();
      expect(Number.isFinite(-42)).to.be.ok();
      expect(Number.isFinite("42")).not.to.be.ok();
      expect(Number.isFinite(NaN)).not.to.be.ok();
      expect(Number.isFinite(Infinity)).not.to.be.ok();
    });
  });

  describe(".isInteger()", function () {
    it("checks if the value passed is an integer", function () {
      expect(Number.isInteger(42)).to.be.ok();
      expect(Number.isInteger(42.42)).not.to.be.ok();
    });
  });

  describe(".isNumeric()", function () {
    it("checks if the value passed is numeric", function () {
      expect(Number.isNumeric(42)).to.be.ok();
      expect(Number.isNumeric(42.42)).to.be.ok();
      expect(Number.isNumeric("42")).to.be.ok();
      expect(Number.isNumeric("42.42")).to.be.ok();
      expect(Number.isNumeric("error")).not.to.be.ok();
      expect(Number.isNumeric({})).not.to.be.ok();
    });
  });

  describe("#limitTop(), #limitBottom() & #limit()", function () {
    it("limits the number to a specific range", function () {
      expect((-10).limit(0, 10)).to.be(0);
      expect((5).limit(0, 10)).to.be(5);
      expect((10).limitTop(20)).to.be(10);
      expect((10).limitTop(5)).to.be(5);
    });
  });

  describe("#trunc(), #toInt() & #toFloat()", function () {
    it("convert the float number to an integer or just keeps the float", function () {
      var num = 42.42;
      expect(num.toFloat()).to.be(num);
      expect(num.trunc()).to.be(num.toInt());
      expect(num.trunc()).to.be(42);
      expect(num.trunc()).not.to.be(num);
    });
  });

  describe("#format()", function () {
    it("convert the number to a string with proper thousands separator and decimal mark", function () {
      var num = 12345.6789;

      expect(num.format(2)).to.be("12,345.68");
      expect(num.format(3)).to.be("12,345.679");
      expect(num.format()).to.be("12,346");
      expect((123456789).format()).to.be("123,456,789");
      expect(num.format(2, " ", ",")).to.be("12 345,68");

      Number.FORMAT_THOUSANDS_SEPARATOR = " ";
      Number.FORMAT_DECIMAL_MARK = ",";

      expect(num.format(2)).to.be("12 345,68");
    });
  });

  describe("Math", function () {
    it("counts modulus", function () {
      expect((25).mod(3)).to.be(1);
      expect((-1).mod(3)).to.be(2);
    });

    it("counts an absolute value", function () {
      expect((-42).abs()).to.be(Math.abs(-42));
      expect((42).abs()).to.be(Math.abs(42));
    });

    it("performs rounding (includin floor and ceil)", function () {
      var a = 14.25, b = 15.65;

      expect(a.round()).to.be(Math.round(a));
      expect(b.round()).to.be(Math.round(b));
      expect(a.round(1)).to.be(Math.round(a * 10) / 10);
      expect(b.round(1)).to.be(Math.round(b * 10) / 10);
      expect(a.round(-1)).to.be(Math.round(a / 10) * 10);
      expect(b.round(-1)).to.be(Math.round(b / 10) * 10);

      expect(a.floor()).to.be(Math.floor(a));
      expect(b.floor()).to.be(Math.floor(b));
      expect(a.floor(1)).to.be(Math.floor(a * 10) / 10);
      expect(b.floor(1)).to.be(Math.floor(b * 10) / 10);
      expect(a.floor(-1)).to.be(Math.floor(a / 10) * 10);
      expect(b.floor(-1)).to.be(Math.floor(b / 10) * 10);

      expect(a.ceil()).to.be(Math.ceil(a));
      expect(b.ceil()).to.be(Math.ceil(b));
      expect(a.ceil(1)).to.be(Math.ceil(a * 10) / 10);
      expect(b.ceil(1)).to.be(Math.ceil(b * 10) / 10);
      expect(a.ceil(-1)).to.be(Math.ceil(a / 10) * 10);
      expect(b.ceil(-1)).to.be(Math.ceil(b / 10) * 10);
    });

    it("counts powers and the square root", function () {
      expect((2).pow(0)).to.be(Math.pow(2, 0));
      expect((2).pow()).to.be(Math.pow(2, 2));
      expect((2).pow(3)).to.be(Math.pow(2, 3));
      expect((2).pow(4)).to.be(Math.pow(2, 4));
      expect((2).pow(-2)).to.be(Math.pow(2, -2));

      expect((64).sqrt()).to.be(Math.sqrt(64));
    });

    it("counts a logarithm with a custom base", function () {
      expect((100).log()).to.be(Math.log(100));
      expect((100).log(10)).to.be(Math.log(100) / Math.log(10));
    });

    it("returns the signum value", function () {
      expect((-5).sign()).to.be(Math.sign(-5));
      expect((0).sign()).to.be(Math.sign(0));
      expect((7).sign()).to.be(Math.sign(7));
    });
  });

  describe("#toDeg() & #toRad()", function () {
    it("convert radians to degrees and vice-versa", function () {
      expect(Math.PI.toDeg()).to.be(180);
      expect((180).toRad()).to.be(Math.PI);
    });
  });
});
