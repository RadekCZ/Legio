'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Array", function () {
  describe(".is()", function () {
    it("determines whether the given value is an array", function () {
      expect(Array.is([])).to.be.ok();
      expect(Array.is(new Array())).to.be.ok();
      expect(Array.is(Array.from({ 0: 42, length: 1 }))).to.be.ok();
      expect(Array.is({ 0: 42, length: 1 })).not.to.be.ok();
      expect(Array.is(arguments)).not.to.be.ok();
    });
  });

  describe(".from()", function () {
    it("converts an array-like object to a real array", function () {
      var obj = {
        0: "10",
        1: "20",

        length: 2
      };

      expect(Array.from(obj)).to.be.an(Array);

      var i = 0;
      Array.from(obj, function (val, key) {
        expect(this).to.be(obj);
        ++i;
      }, obj);

      expect(i).to.be(obj.length);
    });
  });

  describe("#add() & #tack()", function () {
    it("extends the array with values from another array", function () {
      var a1, a2, a3;

      a1 = [1, 2, 3];
      a2 = [4, 5, 6];
      a3 = a1.add(a2);

      expect(a3).to.be(a1);
      expect(a3).to.eql([1, 2, 3, 4, 5, 6]);

      a1.tack(7, 8, 9);

      expect(a1).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe("#remove() & #removeAt()", function () {
    it("removes an item from the array", function () {
      expect([1, 2, 3].remove(2)).to.eql([1, 3]);
      expect([1, 2, 2, 3].remove(2)).to.eql([1, 2, 3]);
      expect([1, 2, 3].remove(4)).to.eql([1, 2, 3]);
      expect([{}].remove({})).to.eql([{}]);

      expect([1, 2, 3].removeAt(1)).to.eql([1, 3]);
      expect([1, 2, 3].removeAt(1, 2)).to.eql([1]);
      expect([1, 2, 3].removeAt()).to.eql([2, 3]);
    });
  });

  describe("#insert()", function () {
    it("insert values into the array", function () {
      expect([1, 2, 3].insert(1, [1.1, 1.2])).to.eql([1, 1.1, 1.2, 2, 3]);
      expect([1, 2, 3].insert(5, [5])).to.eql([1, 2, 3, 5]);
      expect([1, 2, 3].insert(Infinity, [5])).to.eql([1, 2, 3, 5]);
    });
  });

  describe("#first() & #last()", function () {
    it("returns the first or the last item", function () {
      expect([1, 2, 3].first()).to.be(1);
      expect([1, 2, 3].last()).to.be(3);
      expect([1].first()).to.be(1);
      expect([1].last()).to.be(1);
      expect([].first()).to.be(undefined);
      expect([].last()).to.be(undefined);
    });
  });

  describe("#each()", function () {
    it("iterates the array and executes a callback for every item", function () {
      var arr = [1, 2, 3, 4], res = 0;

      arr.each(function (val, key) {
        if (key === 2) {
          res += val * 2;

          return false; // break
        }

        res += val;
      });

      expect(res).to.be(9);
    });
  });

  describe("#indexOf() & #lastIndexOf()", function () {
    it("returns an index of the given item", function () {
      expect([1, 2, 3, 2, 4].indexOf(2)).to.be(1);
      expect([1, 2, 3, 2, 4].indexOf(2, 2)).to.be(3);
      expect([1, 2, 3, 2, 4].lastIndexOf(2)).to.be(3);
      expect([1, 2, 3, 2, 4].lastIndexOf(2, 2)).to.be(1);

      expect([1, 2, 3, 2, 4].indexOf(5)).to.be(-1);
      expect([1, 2, 3, 2, 4].lastIndexOf(5)).to.be(-1);
    });
  });

  describe("#forEach()", function () {
    it("iterates the array and executes a callback for every item", function () {
      var arr = [1, 2, 3, 4], res = 0;

      arr.forEach(function (val, key) {
        if (key === 2) {
          res += val * 2;

          return false; // not really break
        }

        res += val;
      });

      expect(res).to.be(13);
    });
  });

  describe("#filter()", function () {
    it("filters items of the array to a new one", function () {
      expect([1, 2, 3, 4].filter(function (val) { return val % 2 === 0; })).to.eql([2, 4]);
    });
  });

  describe("#every()", function () {
    it("returns true if all items pass the control function", function () {
      expect([1, 2, 3, 4].every(function (val) { return val > 0; })).to.be.ok();
      expect([1, 2, 3, 4].every(function (val) { return val > 2; })).not.to.be.ok();
    });
  });

  describe("#some()", function () {
    it("returns true if at leas one item passes the control function", function () {
      expect([1, 2, 3, 4].some(function (val) { return val > 0; })).to.be.ok();
      expect([1, 2, 3, 4].some(function (val) { return val > 2; })).to.be.ok();
      expect([1, 2, 3, 4].some(function (val) { return val > 4; })).not.to.be.ok();
    });
  });

  describe("#map()", function () {
    it("maps the array and returns a new one with modified values", function () {
      expect([1, 2, 3].map(function (val) { return val * 2; })).to.eql([2, 4, 6]);
      expect([1, 2, 3].map(function (val, key) { return val + key; })).to.eql([1, 3, 5]);
    });
  });

  describe("#reduce() & #reduceRight()", function () {
    it("executes the given function on all items and returns the final value", function () {
      expect([1, 2, 3].reduce(function (res, val) { return res + val; })).to.be(6);
      expect([1, 2, 3].reduce(function (res, val, key) { return res + val + key; })).to.be(9);
      expect([1, 2, 3].reduceRight(function (res, val) { return res + val; })).to.be(6);
      expect([1, 2, 3].reduceRight(function (res, val, key) { return res + val + key; })).to.be(7);
    });
  });

  describe("#find() & #findeIndex()", function () {
    it("finds an item or an index of the item in the array", function () {
      expect([1, 2, 3].find(function (val) { return val % 2 === 0; })).to.be(2);
      expect([1, 2, 3].findIndex(function (val) { return val % 2 === 0; })).to.be(1);
    });
  });
});
