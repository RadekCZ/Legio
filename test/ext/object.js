'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("Object", function () {
  describe(".isAny() & .isPlain()", function () {
    it("determines if the given value is an object (any or just a plain one)", function () {
      expect(Object.isAny({})).to.be.ok();
      expect(Object.isAny([])).to.be.ok();
      expect(Object.isAny(/wow/g)).to.be.ok();

      expect(Object.isAny("")).not.to.be.ok();
      expect(Object.isAny(10)).not.to.be.ok();
      expect(Object.isAny(true)).not.to.be.ok();

      expect(Object.isPlain({})).to.be.ok();
      expect(Object.isPlain([])).not.to.be.ok();
      expect(Object.isPlain(/wow/g)).not.to.be.ok();

      expect(Object.isPlain(Object.create(Object.create({})))).to.be.ok();
    });
  });

  describe(".owns()", function () {
    it("tells if the object owns the given property (and not just inherits it)", function () {
      var obj = {};

      expect(Object.owns(obj, "toString")).not.to.be.ok();

      obj.toString = function () {
        return "Hello";
      };

      expect(Object.owns(obj, "toString")).to.be.ok();

      expect(Object.owns(obj, "noSuchProperty")).not.to.be.ok();
    });
  });

  describe(".is()", function () {
    it("performs the strict equality but handles also NaN and +0/-0", function () {
      var obj = {};
      expect(Object.is(obj, obj)).to.be.ok();
      expect(Object.is(obj, {})).not.to.be.ok();
      expect(Object.is(NaN, NaN)).to.be.ok();
      expect(Object.is(-0, -0)).to.be.ok();
      expect(Object.is(+0, -0)).not.to.be.ok();
    });
  });

  describe(".create()", function () {
    it("returns a new object inheriting from the given object", function () {
      var obj = {
        a: "a"
      };

      expect(Object.owns(Object.create(obj), "a")).not.to.be.ok();
      expect(Object.create(obj).a).to.be(obj.a);

      var Con = function () {};
      Con.prototype = obj;

      expect(Object.create(obj) instanceof Con).to.be.ok();
    });
  });

  describe(".keys()", function () {
    it("returns an array of enumerable keys", function () {
      var obj = {
        a: "a"
      };

      expect(Object.keys(obj)).to.eql(["a"]);
      expect(Object.keys(Object.create(obj))).to.eql([]);
    });
  });

  describe(".empty()", function () {
    it("determines whether the object doesn't have any own properties", function () {
      expect(Object.empty({})).to.be.ok();
      expect(Object.empty({ a: "hello" })).not.to.be.ok();
    });
    it("also works with null, undefined, zero and empty string", function () {
      expect(Object.empty(null)).to.be.ok();
      expect(Object.empty(undefined)).to.be.ok();
      expect(Object.empty("")).to.be.ok();
      expect(Object.empty(0)).to.be.ok();
    });
  });

  describe(".clone()", function () {
    it("returns a clone of the given object", function () {
      var obj = {
        a: "hello",
        b: {
          c: "deep value"
        }
      };

      expect(Object.clone(obj)).not.to.be(obj);
      expect(Object.clone(obj)).to.eql(obj);

      expect(Object.clone(obj).b).not.to.be(obj.b);

      expect(Object.clone(obj, false).b).to.be(obj.b);
    });
  });

  describe(".assign()", function () {
    it("assings values from other objects to the object given as a first parameter", function () {
      expect(Object.assign({}, { a: "a" }, { b: "b" })).to.eql({ a: "a", b: "b" });
    });
  });

  describe(".merge()", function () {
    it("merges multiple objects to a single one", function () {
      expect(Object.merge({ a: "a" }, { b: "b" })).to.eql({ a: "a", b: "b" });
    });
  });

  describe(".each()", function () {
    it("performs a foreach-like operation for objects and arrays", function () {
      var obj = { a: 1, b: "2", c: "three" }, res = [];

      Object.each(obj, function (val, key) {
        res.push(key);
        res.push(val);
      });

      expect(res).to.eql(["a", 1, "b", "2", "c", "three"]);

      var i = 0;
      Object.each(res, function (val, key) {
        expect(val).to.be(res[i++]);
      });

      expect(i).to.be(res.length);

      var j = 0;
      Object.each({ 0: 1, 1: 2, 2: 3, length: 3 }, function (val, key) {
        j += val;
      }, true);

      expect(j).to.be(6);
    });
  });

  describe(".toQueryString()", function () {
    it("converts the object to an URI-safe query string", function () {
      expect(Object.toQueryString({ a: "a", b: 123, c: [1, 2, 3], d: { sub: "value" } })).to.be(
        "a=a&b=123&"
        + "c[0]".encodeURI() + "=1&"
        + "c[1]".encodeURI() + "=2&"
        + "c[2]".encodeURI() + "=3&"
        + "d[sub]".encodeURI() + "=value");
    });
  });

  describe(".fromQueryString()", function () {
    it("parses the given query string and returns a corresponding object", function () {
      expect(Object.fromQueryString("a=a&b=123&c[]=1&c[]=2&d[sub]=value")).to.eql({
        a: "a",
        b: "123",
        c: ["1", "2"],
        d: {
          sub: "value"
        }
      });

      expect(Object.fromQueryString("a=true&b=false", true)).to.eql({
        a: true,
        b: false
      });
    });
  });
});
