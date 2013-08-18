#module Legio.construct (
  Legio = "../std" = Legio
)

/**
 * Main function which generates a special constructor using the data argument
 * data: Object
 *    init: Function
 *    inherits: Function | [construct] | [struct]
 *    statics: Object
 *    mixins: Array
 *    members: Object
 */
construct(data) -> {
  var Fn = data.init, Parent = data.inherits, statics = data.statics, mixins = data.mixins, members = data.members;
  
  if (Parent) {
    inherits(Fn, Parent);
    Fn.include(Parent);
  }
  // else if (Parent === null) {
    // Fn.prototype = Object.create(null);
    // Parent = true;
  // }
  
  if (mixins) {
    for (var i = 0, j = mixins.length; i < j; ++i) {
      Fn.mixin(mixins[i]);
    }
  }
  
  if (members) {
    if (Parent || mixins) {
      Fn.mixin(members);
    }
    else {
      Fn.prototype = members;
    }
  }
  
  if (statics) {
    Fn.include(statics);
  }
  
  Fn.prototype.constructor = Fn;
  
  return Fn;
}

// This function is used to call the super constructor (in inherited constructs)
superInit() -> {
  var sup = this.superConstructor,
      proto = sup.prototype;
  
  this.superConstructor = proto.superConstructor;
  
  sup.apply(this, arguments);
  
  delete this.superConstructor;
}

// This method calls a method of ther super construct
superMethod(name, args) -> {
  var proto = this.superConstructor.prototype;
  
  this.superConstructor = proto.superConstructor;
  
  var res = proto[name].apply(this, args);
  
  delete this.superConstructor;
  
  return res;
}

// This method is used for inheritance using Object.create for the prototype
inherits(Fn, Parent) -> {
  var proto = Fn.prototype = Object.create(Parent.prototype);
  
  proto.superConstructor = Parent;
  proto.superInit = superInit;
  proto.superMethod = superMethod;
}

#export construct;