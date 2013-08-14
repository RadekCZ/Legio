#module Legio.draft (
  Legio = "../std" = Legio
)

// Function which simulates an interface
draft(inherits, data) -> {
  if (!data) {
    data = inherits;
  }
  else {
    data = Object.merge(inherits._interface, data);
  }
  
  var check = checkObject.bind(data);
  check._interface = data;
  
  return check;
}

checkObject(obj) -> {
  var data = @;
  
  #foreach (i in data) {
    var T = data[i], val = obj[i];
    
    if (T === null) {
      if (val === undefined) {
        return false;
      }
    }
    else if (T === Function || T === String || T === Number || T === Boolean || T === Array || T === Object) {
      if (!T.is(val)) {
        return false;
      }
    }
    else if (Function.is(T) && T._interface) {
      if (!T(val)) {
        return false;
      }
    }
    else if (!(val instanceof T)) {
      return false;
    }
  }
  
  return true;
}

#export draft;
