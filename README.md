# Legio

A simple JavaScript library for handling routine tasks.

**Installation:**
```
npm install legio
```

## legio/std
```javascript
Legio
  nil(obj) -> Boolean
  or(val1, val2) -> val1 ?: val2

Object
  is(obj) -> Boolean
  is(obj1, obj2) -> Boolean
  owns(obj, key) -> Boolean
  create(obj) -> Object
  keys(obj) -> Array
  ownKeys|getOwnPropertyNames(obj) -> Array
  isEmpty|empty(obj) -> Boolean
  clone(obj) -> Object
  extend(obj, ext) -> obj
  merge(objs...) -> Object
  forEach|each(obj, fn)

Array
  is(obj) -> Boolean
  convert|from(obj, fromIndex, toIndex) -> Array
  prototype
    indexOf
    lastIndexOf
    forEach
    each(fn, fromIndex, toIndex)
    filter
    every
    some
    map
    reduce
    reduceRight
    add(array) -> this

Function
  is(obj) -> Boolean
  prototype
    bind
    bindList(self, list) -> Function
    mixin(obj) -> this
    include|extend(obj) -> this

RegExp
  escape(str) -> String

String
  is(obj) -> Boolean
  prototype
    trim
    trimLeft
    trimRight
    replaceAll(from, to) -> String
    toInt(radix) -> Number
    toFloat() -> Number
    repeat(times = 2) -> String
    contains
    startsWith
    endsWith

Math
  rand(from, to) -> Number
  sign

Number
  is(obj) -> Boolean
  parseInt
  parse
  isNaN
  isFinite
  isNumeric(obj) -> Boolean
  global
    isNaN
    isFinite
  prototype
    limit(from, to) -> Number
    toInt() -> Number
    toFloat() -> Number
    mod(n) -> Number
    abs() -> Number
    round(dec = 0) -> Number
    floor() -> Number
    ceil() -> Number
    pow(exp = 2) -> Number
    sqrt() -> Number
    log(base) -> Number
    toRad() -> Number
    toDeg() -> Number

Boolean
  is(obj) -> Boolean

Date
  now() -> Number
```

## legio/oop/construct
```javascript
var A = construct({
  init: function (a) {
    this.a = a;
  },

  proto: {
    toString: function () {
      return "a: " + this.a;
    }
  }
});

var Show = {
  show: function () {
    alert(this.a + ", " + this.b);
  }
};

var B = construct({
  inherit: A,

  init: function (a, b) {
    this.superInit(a);

    this.b = b;
  },

  proto: {
    toString: function () {
      return this.superCall("toString") + ", b: " + this.b;
    }
  },

  mixin: [Show],

  own: {
    create: function (a, b) {
      return new B(a, b);
    }
  }
});
```

## legio/oop/struct
```javascript
var Point = struct("x", "y", "z");

var p = new Point(1, 2, 3); // p.x = 1; p.y = 2; p.z = 3;
```

## legio/oop/type
```javascript
var
A = type({
  b: String,
  c: Number
}),
B = type(A, {
  a: Function
});

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

console.log(A(a), A(b)); // true, true
console.log(B(a), B(b)); // true, false
```

## legio/async
```javascript
Promise(that)
  when(list: Promise[]) -> Promise
  prototype
    pending: Boolean
    resolved: Boolean
    rejected: Boolean
    then(onResolve, onReject, onNotify) -> this
    resolve(...) -> Boolean
    reject(...) -> Boolean
    notify(...) -> Boolean
    bindResolve(...) -> Function
    bindReject(...) -> Function
    bindNotify(...) -> Function

ChainPromise : Promise
  prototype
    then(onResolve, onReject, onNotify) -> Promise

Interval(fn, time, wrap: Boolean)
  prototype
    activate(immediately: Boolean, time)
    suspend()

Timeout(fn, time, wrap: Boolean)
  start(time, that) -> Promise
  prototype
    start(time)
    cancel()
```

## legio/util
```javascript
Key [enum]

Request
  getXHR(file, async, post) -> XMLHttpRequest
  file(file, cfg: { async: Boolean, callback: Function, get: String, post: String }) -> Promise | XMLHttpRequest
  script(file, callback) -> Promise | HTMLScriptElement

URI
  encode(str) -> String
  decode(str) -> String
  encodeComponent(str) -> String
  decodeComponent(str) -> String
  create|stringify(obj) -> String
  parse(str) -> Object
```
