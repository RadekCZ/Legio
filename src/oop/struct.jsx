#module Legio.struct (
  Legio = "../std" = Legio
)

// Main function which generates a special constructor
struct() -> {
  var keys = arguments;
  return () -> {
    fill(@, keys, arguments);
  };
}

// Function that fills properties by arguments
fill(obj, keys, values) -> {
  #foreach (i of keys) {
    obj[keys[i]] = values[i];
  }
}

#export struct;
