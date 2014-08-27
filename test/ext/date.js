'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Date", function () {
  describe(".now()", function () {
    it("returns the current UNIX timestamp in milliseconds", function () {
      expect(Date.now() - (new Date())).to.be.within(-100, 0);
    });
  });

  describe("#getISODay()", function () {
    it("returns a similar output as getDay, but returns 7 for sunday", function () {
      // 7 means August
      expect(new Date(2014, 7, 24).getISODay()).to.be(7);
    });
  });

  describe("#getWeek() & #getYearOfWeek()", function () {
    it("returns a similar output as getDay, but returns 7 for sunday", function () {
      console.log(new Date(2014, 7, 24).getWeek());

      expect(new Date(2014, 7, 24).getWeek()).to.be(34);
      expect(new Date(2014, 7, 24).getYearOfWeek()).to.be(2014);

      // Determined by Thursday
      expect(new Date(2014, 11, 31).getWeek()).to.be(1);
      expect(new Date(2014, 11, 31).getYearOfWeek()).to.be(2015);

      expect(new Date(1999, 11, 31).getWeek()).to.be(52);
      expect(new Date(1999, 11, 31).getYearOfWeek()).to.be(1999);
    });
  });
});
