'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("RegExp", function () {
  describe(".escape()", function () {
    it("returns an escape version of the given string so it can be used inside of a RegExp", function () {
      expect(RegExp.escape("\\.*")).to.be("\\\\\\.\\*");
      expect(RegExp.escape("a")).to.be("a");
    });
  });

  describe(".flags()", function () {
    it("returns a string that indicates which flags does the RegExp have", function () {
      expect(/a/.flags()).to.be("");
      expect(/a/g.flags()).to.be("g");
      expect(/a/i.flags()).to.be("i");
      expect(/a/m.flags()).to.be("m");
      expect(/a/gm.flags()).to.be("gm");
      expect(/a/gi.flags()).to.be("gi");
      expect(/a/im.flags()).to.be("im");
      expect(/a/gim.flags()).to.be("gim");
    });
  });
});
