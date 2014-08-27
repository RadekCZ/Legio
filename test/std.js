'use strict';
var
expect = require("expect.js"),
Legio = require("../std");

describe("Legio", function () {
  describe(".empty()", function () {
    it("determines whether the given value is undefined or null", function () {
      expect(Legio.empty(undefined)).to.be.ok();
      expect(Legio.empty(null)).to.be.ok();
      expect(Legio.empty(false)).not.to.be.ok();
      expect(Legio.empty("")).not.to.be.ok();
      expect(Legio.empty(0)).not.to.be.ok();
    });
  });

  describe(".choose()", function () {
    it("if the first value is empty, returns the second value", function () {
      expect(Legio.choose(1, 2)).to.be(1);
      expect(Legio.choose(1, null)).to.be(1);
      expect(Legio.choose(null, 2)).to.be(2);
      expect(Legio.choose(undefined, 2)).to.be(2);
      expect(Legio.choose(false, 2)).to.be(false);
      expect(Legio.choose(null, undefined)).to.be(undefined);
    });
  });
});
