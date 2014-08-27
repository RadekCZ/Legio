'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Math", function () {
  describe(".rand()", function () {
    it("returns a random integer", function () {
      this.timeout(0);

      for (var i = 0; i < 20; ++i) {
        expect(Math.rand(10, 10)).to.be(10);
      }
    });
  });

  describe(".sign()", function () {
    it("returns a signum value of the given number", function () {
      expect(Math.sign(10)).to.be(1);
      expect(Math.sign(-42)).to.be(-1);
      expect(Math.sign(0)).to.be(0);
      expect(Math.sign(-0)).to.be(0);
    });
  });

  describe(".trunc()", function () {
    it("returns the integer part of a float number", function () {
      expect(Math.trunc(10.567)).to.be(10);
      expect(Math.trunc(10.123)).to.be(10);
      expect(Math.trunc(-7.123)).to.be(-7);
      expect(Math.trunc(-7.567)).to.be(-7);
    });
  });
});
