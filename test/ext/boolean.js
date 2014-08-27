'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Boolean", function () {
  describe(".is()", function () {
    it("determines whether the given value is a boolean", function () {
      expect(Boolean.is(true)).to.be.ok();
      expect(Boolean.is(false)).to.be.ok();
      expect(Boolean.is(null)).not.to.be.ok();
      expect(Boolean.is(undefined)).not.to.be.ok();
      expect(Boolean.is(new Boolean(true))).not.to.be.ok();
      expect(Boolean.is(Boolean(10))).to.be.ok();
    });
  });
});
