# Legio

A simple JavaScript library for handling routine tasks.

**Installation:**
```
npm install legio
```

**Compatible with:**
- Node.js
- Browserify

**Modules:**
- legio
  - async
    - task
    - promise
    - interval
    - timeout
  - oop
    - type
    - construct
    - struct
  - util
    - key
    - request
    - uri

**TODO:**
- The async/await syntax using generators
- Extensions of the core library (strings and numbers mostly)

## legio
```javascript
Legio
  nil(obj) -> Boolean
  or(val1, val2) -> val1 ?: val2

Object
  is(obj) -> Boolean
  is(val1, val2) -> Boolean
  owns(obj, key) -> Boolean
  create(proto) -> Object
  keys(obj) -> Array
  empty(obj) -> Boolean
  clone(obj) -> Object // Deep cloning
  assign(obj, ext) -> obj
  merge(objs...) -> Object
  each(obj, fn)

Array
  is(obj) -> Boolean
  from(obj, fromIndex, toIndex) -> Array
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
    tack(...) -> this // Same as add, but uses arguments

Function
  is(obj) -> Boolean
  prototype
    bind(self, args...) -> Function
    bindList(self, list) -> Function
    assign(obj) -> this
    mixin(obj) -> this // This assigns properties into the prototype

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
    repeat(times) -> String
    contains
    startsWith
    endsWith

Math
  rand(from, to) -> Number
  sign(num) -> Number
  trunc(num) -> Number

Number
  is(obj) -> Boolean
  parseInt
  parse
  isNaN(num) -> Boolean
  isFinite(num) -> Boolean
  isInteger(num) -> Boolean
  isNumeric(val) -> Boolean
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
    log(base?) -> Number
    toRad() -> Number
    toDeg() -> Number

Boolean
  is(obj) -> Boolean

Date
  now() -> Number
  prototype
    getISODay() -> Number // The sunday is 7
    getWeek() -> Number
    getWeekYear() -> Number
```

## legio/oop/type
```javascript
type(parent?, definition) -> Function
  OR(...)
  UNDEFINED // val === undefined
  DEFINED // val !== undefined
  NULL // val === null
  FULL // val !== undefined && val !== null
  EMPTY // val === undefined || val === null
```

**Example:**
```javascript
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

console.log(A(a), A(b)); // true, true
console.log(B(a), B(b)); // true, false

var
C = type({ d: type.UNDEFINED, a: type.OR(String, Function) });

console.log(C(a), C(b)); // true, true
```

## legio/oop/construct
```javascript
construct(cfg) -> {construct}

[cfg]
  init: Function
  inherit: Function
  proto: Object
  mixin: Object[]
  own: Object

{construct} : Function
  Super: Function
  superInit(...)
  superCall(name, args)
```

**Example:**
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
struct(names...) -> Function
struct(names: String[], proto?, typeDefinition?) -> Function
```

**Example:**
```javascript
var Point = struct("x", "y", "z");

var p = new Point(1, 2, 3); // p.x = 1; p.y = 2; p.z = 3;

var TypedPoint = struct(["x", "y", "z"], null, { x: Number, y: Number, z: type.OR(type.UNDEFINED, Number) });

var
p1 = new TypedPoint(1, 2, 3), // Okay
p2 = new TypedPoint(1, 2), // Okay
p3 = new TypedPoint(1, "hello"); // Error
```

## legio/async
```javascript
Async
  denodeify(fn, that?) -> {(...) -> Promise}
```

## legio/async/task
```javascript
Task
  run(fn)
```

## legio/async/promise
```javascript
Promise(that)
  all(list: Promise[]) -> Promise
  allDone(list: Promise[]) -> Promise
  when(thenable) -> Promise
  prototype
    pending: Boolean
    awaiting: Object
    resolved: Boolean
    rejected: Boolean

    then(onFulfilled, onRejected) -> Promise
    notified(onNotified) -> this
    fail(onRejected) -> Promise
    always(handler) -> Promise

    resolve(value)
    fulfill(value) -> Boolean
    reject(reason) -> Boolean
    notify(argument) -> Boolean

    bindResolve(value?) -> Function
    bindFulfill(value?) -> Function
    bindReject(reason?) -> Function
    bindNotify(argument?) -> Function

    nodeifyThen(callback) -> Promise
    nodeifyResolve() -> Function
```

## legio/async/interval
```javascript
Interval(fn, time, wrap: Boolean)
  start(time, immediately: Boolean) -> Promise
  prototype
    activate(immediately: Boolean, time)
    suspend()
```

## legio/async/timeout
```javascript
Timeout(fn, time, wrap: Boolean)
  start(time, that) -> Promise
  prototype
    start(time)
    cancel()
```

## legio/util/key
```javascript
Key: {enum}
```

## legio/util/request
```javascript
Request
  file(file, cfg) -> Promise | String // A string is returned in case of a sync request
  script(file) -> Promise // Just in a web browser

[cfg]
  async: Boolean
  callback: Function
  get: String
  post: String
```

## legio/util/uri
```javascript
URI
  encode(str) -> String
  decode(str) -> String
  encodeComponent(str) -> String
  decodeComponent(str) -> String
  create|stringify(obj) -> String
  parse(str) -> Object
```

## legio/util/xhr
```javascript
XMLHttpRequest
```
