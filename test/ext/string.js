'use strict';
var
expect = require("expect.js"),
Legio = require("../../std");

describe("String", function () {
  describe(".is()", function () {
    it("determines if the given value is a string", function () {
      expect(String.is("hello")).to.be.ok();
      expect(String.is(new String("hello"))).not.to.be.ok();
      expect(String.is(undefined)).not.to.be.ok();
      expect(String.is(10)).not.to.be.ok();
      expect(String.is({})).not.to.be.ok();
    });
  });

  describe("#replaceAll()", function () {
    it("replaces all occurrences of the first string with the second one", function () {
      expect("aaa".replaceAll("a", "b")).to.be("bbb");
      expect("aaa".replaceAll("a", "aa")).to.be("aaaaaa");
      expect("Hello world".replaceAll("world", "friend")).to.be("Hello friend");
      expect("Hello friend, hello".replaceAll("hello", "how are you?")).to.be("Hello friend, how are you?");
    });
  });

  describe("#toInt() & #toFloat()", function () {
    it("converts the string to a number", function () {
      expect("10.2".toFloat()).to.be(10.2);
      expect("10.2".toInt()).to.be(10);
      expect("10.2 test".toInt()).to.be(10);
      expect(Number.isNaN("test 10.2".toInt())).to.be.ok();

      expect("fa".toInt(16)).to.be(250);
    });
  });

  describe("#encodeURI() & #decodeURI()", function () {
    it("converts a string to its URI-safe form or parses it", function () {
      expect("=".encodeURI()).to.be("%3D");
      expect("=".encodeURI(true)).to.be("=");
      expect("%3D".decodeURI()).to.be("=");
      expect("%3D".decodeURI(true)).to.be("%3D");
    });
  });

  describe("#encodeHTML() & #decodeHTML()", function () {
    it("converts a string to its HTML-safe form or parses it", function () {
      expect("<>'\"/& \\ test".encodeHTML()).to.be("&lt;&gt;&#39;&quot;&#47;&amp; \\ test");
      expect("&lt;&gt;&#39;&quot;&#47;&amp;&nbsp;&#54;&#x2a;".decodeHTML()).to.be("<>'\"/& " + String.fromCharCode(54) + String.fromCharCode(42));
    });
  });

  describe("#pad()", function () {
    it("pads the string to a given size", function () {
      expect("a".pad(3)).to.be(" a ");
      expect("a".pad(4)).to.be(" a  ");
      expect("a".padLeft(3)).to.be("  a");
      expect("a".padRight(3)).to.be("a  ");

      expect("a".pad(5, ".-")).to.be(".-a.-");
    });
  });

  describe("#chars()", function () {
    it("returns an array of the string's characters", function () {
      expect("abc".chars()).to.eql(["a", "b", "c"]);
    });
  });

  describe("#reverse()", function () {
    it("returns a reverted string", function () {
      expect("abc".reverse()).to.be("cba");
    });
  });

  describe("#assign()", function () {
    it("assigns values from a given object into variables in curly braces {}", function () {
      expect("{a} + {b} = {c}".assign({ a: 1, b: 2, c: 3 })).to.be("1 + 2 = 3");

      expect(function () {
        "{a}".assign();
      }).to.throwError(TypeError);

      expect("{a}".assign({})).to.be("{a}");
    });
  });

  describe("#normalizeLines()", function () {
    it("converts all line endings to \\n", function () {
      expect("\n\r\n\r".normalizeLines()).to.be("\n\n\n");
    });
  });

  describe("#trim()", function () {
    it("removes whitespace characters from sides of the string", function () {
      expect("   \r\n  \t    Hello ".trimLeft()).to.be("Hello ");
      expect(" Hello   \r\n  \t    ".trimRight()).to.be(" Hello");
      expect("   \r\n  \t    Hello   \r\n  \t    ".trim()).to.be("Hello");
    });
  });

  describe("#contains()", function () {
    it("determines whether the string contains some substring", function () {
      expect("Hello, world".contains("world")).to.be.ok();
      expect("Hello, world".contains("earth")).not.to.be.ok();
      expect("Hello, world".contains("world", 8)).not.to.be.ok();
    });
  });

  describe("#startsWith() & #endsWith()", function () {
    it("determines whether the string starts or ends with some substring", function () {
      expect("Hello, world".startsWith("Hello")).to.be.ok();
      expect("Hello, world".endsWith("world")).to.be.ok();

      expect("Hello, world".startsWith("world")).not.to.be.ok();
      expect("Hello, world".startsWith("world", 7)).to.be.ok();

      expect("Hello, world".endsWith("Hello")).not.to.be.ok();
      expect("Hello, world".endsWith("Hello", 5)).to.be.ok();
    });
  });

  describe("#repeat()", function () {
    it("repeats the string the specified number of times", function () {
      expect("abc".repeat(3)).to.be("abcabcabc");
    });
    it("throws an error if the number is lower than 0 or equals Infinity", function () {
      expect(function () {
        "abc".repeat(-1);
      }).to.throwError(RangeError);
      expect(function () {
        "abc".repeat(1 / 0);
      }).to.throwError(RangeError);
    });
  });

  describe("#repeatUntil()", function () {
    it("repeats the string until it reaches the given length", function () {
      expect("abc".repeatUntil(10)).to.be("abcabcabca");
      expect("abc".repeatUntil(1)).to.be("a");
    });
    it("throws an error if the length is lower than 0 or equals Infinity", function () {
      expect(function () {
        "abc".repeatUntil(-1);
      }).to.throwError(RangeError);
      expect(function () {
        "abc".repeatUntil(1 / 0);
      }).to.throwError(RangeError);
    });
  });

  describe("#substr() using a negative index", function () {
    it("starts at the end of the string instead of the start", function () {
      expect("abcde".substr(-2)).to.be("de");
      expect("abcde".substr(-2, 1)).to.be("d");

      expect("abcde".substr(-1, 1)).not.to.be("a");
    });
  });

  describe("#removeDiacritics()", function () {
    it("replaces chars with diacritics with plain ASCII chars", function () {
      expect("Příliš žluťoučký kůň úpěl ďábelské ódy".removeDiacritics()).to.be("Prilis zlutoucky kun upel dabelske ody");
    });
  });

  describe("#capitalize()", function () {
    it("makes the first character of the first word (or all words) uppercase", function () {
      expect("hello world".capitalize()).to.be("Hello world");
      expect("hello world".capitalize(true)).to.be("Hello World");
    });
  });

  describe("#dasherize(), #underscore(), #spacify() & #camelize()", function () {
    it("changes delimitions of word in the string to a specific one", function () {
      expect("hello world".dasherize()).to.be("hello-world");
      expect("helloWorld_dear friends".dasherize()).to.be("hello-world-dear-friends");

      expect("hello-world".underscore()).to.be("hello_world");
      expect("hello---world".spacify()).to.be("hello world");

      expect("hello-world".camelize()).to.be("HelloWorld");
      expect("hello-world".camelize(false)).to.be("helloWorld");
    });
  });

  describe("#parametrize()", function () {
    it("changes the string to its SEO-friendly (URI-fiendly) form", function () {
      expect("Příliš žluťoučký-kůň_úpěl Ďábelské   ódy".parametrize()).to.be("prilis-zlutoucky-kun-upel-dabelske-ody");
    });
  });
});
