'use strict';
var
expect = require("expect.js"),
type = require("../type"),
struct = require("../struct");

describe("struct", function () {
  it("create a simple constructor with defined properties", function () {
    var Point = struct("x", "y", "z");

    var p = new Point(1, 2, 3);

    expect(p).to.eql({ x: 1, y: 2, z: 3 });
  });

  it("can have a predefined prototype", function () {
    var Point = struct(
      ["x", "y", "z"],
      {
        z: 0,
        toString: function () {
          return this.x + " : " + this.y + " : " + this.z;
        }
      }
    );

    expect(new Point(1, 2, 3).toString()).to.be("1 : 2 : 3");
    expect(new Point(1, 2).toString()).to.be("1 : 2 : 0");
  });

  it("performs type checking using the type module", function () {
    var TypedPoint = struct(
      ["x", "y", "z"], null,
      { x: Number, y: Number, z: type.OR(type.UNDEFINED, Number) }
    );

    expect(function () {
      new TypedPoint(1, 2, 3);
    }).not.to.throwError();

    expect(function () {
      new TypedPoint(1, 2);
    }).not.to.throwError();

    expect(function () {
      new TypedPoint(1, "hello");
    }).to.throwError();
  });
});
