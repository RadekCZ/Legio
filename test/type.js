'use strict';
var
expect = require("expect.js"),
type = require("../type");

describe("type", function () {
  it("provides type checking", function () {
    var
    A = type({ b: String, c: Number }),
    B = type(A, { a: Function });

    var
    a = {
      a: function () {},
      b: "hello",
      c: 42
    },
    b = {
      a: "error",
      b: "hello",
      c: 42
    };

    expect(A(a)).to.be.ok();
    expect(A(b)).to.be.ok();
    expect(B(a)).to.be.ok();
    expect(B(b)).not.to.be.ok();

    var
    C = type({ d: type.UNDEFINED, a: type.OR(String, Function) });


    expect(C(a)).to.be.ok();
    expect(C(b)).to.be.ok();
    expect(C({ a: 42 })).not.to.be.ok();
    expect(C({ d: 42 })).not.to.be.ok();
  });
});
