'use strict';
var
expect = require("expect.js"),
construct = require("../construct");

describe("construct", function () {
  var toString, A, B, Trait;

  before(function () {
    A = construct({
      init: function (a) {
        this.a = a;
      },

      proto: {
        toString: (toString = function () {
          return "Value: " + this.a;
        })
      },

      own: {
        staticMethod: function () {
          return "static";
        }
      }
    });

    Trait = {
      getA: function () {
        return this.a;
      },
      getB: function () {
        return this.b;
      }
    };

    B = construct({
      inherit: A,

      init: function (a, b) {
        this.superInit(a);

        this.b = b;
      },

      proto: {
        toString: function () {
          return this.superCall("toString") + ", " + this.b;
        }
      },

      mixin: [Trait]
    });
  });

  it("should have defined methods and one static method", function () {
    expect(A.prototype.toString).to.be(toString);
    expect(A.staticMethod()).to.be("static");
  });

  it("performs the prototypal inheritance", function () {
    expect(B.prototype).to.be.an(A);
  });

  it("should act just like a regular constructor and its methods should return right values", function () {
    var a = new A(1), b = new B(2, 3);

    expect(a).to.be.an(A);
    expect(a).not.to.be.a(B);
    expect(b).to.be.an(A);
    expect(b).to.be.a(B);

    expect(a.toString()).to.be("Value: 1");
    expect(b.toString()).to.be("Value: 2, 3");

    expect(b.getA()).to.be(b.a);
    expect(b.getB()).to.be(b.b);
  });
});
