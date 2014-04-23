'use strict';
var
Legio = require("../std");

/**
 * The main function which generates a special constructor using the data argument
 * data: Object
 *    init: Function
 *    inherit | inherits: Function | [construct] | [struct]
 *    own | statics | owns: Object
 *    mixin | mixins: Array
 *    proto | members: Object
 */
function construct(data) {
  var
  Con = data.init,
  Super = data.inherit || data.inherits,
  own = data.own || data.statics || data.owns,
  mixins = data.mixin || data.mixins,
  proto = data.proto || data.members;

  if (Super) {
    inherits(Con, Super);
    Con.include(Super);
  }
  // else if (Parent === null) {
    // Fn.prototype = Object.create(null);
    // Parent = true;
  // }

  if (mixins) {
    for (var i = 0, j = mixins.length; i < j; ++i) {
      Con.mixin(mixins[i]);
    }
  }

  if (proto) {
    if (Super || mixins) {
      Con.mixin(proto);
    }
    else {
      Con.prototype = proto;
    }
  }

  if (own) {
    Con.include(own);
  }

  Con.prototype.constructor = Con;

  return Con;
}

// This function is used to call the super constructor (in inherited constructs)
function superInit() {
  var
  sup = this.Super,
  proto = sup.prototype;

  this.Super = proto.Super;

  sup.apply(this, arguments);

  delete this.Super;
}

// This method calls a method of the super construct
function superCall(name, args) {
  var proto = this.Super.prototype;

  this.Super = proto.Super;

  var res = proto[name].apply(this, args);

  delete this.Super;

  return res;
}

// This method is used for the inheritance using the Object.create for the prototype
function inherits(Con, Super) {
  var proto = Con.prototype = Object.create(Super.prototype);

  proto.Super = Super;
  proto.superInit = superInit;
  proto.superCall = proto.superMethod = superCall;
}

module.exports = construct;
