(function (global, undefined) {
  "use strict";
  
  function definition() {
    // Main function which generates a special constructor
    function struct() {
      var keys = arguments;
      return function () {
        fill(this, keys, arguments);
      };
    }
    
    // Function that fills properties by arguments
    function fill(obj, keys, values) {
      for (var i = 0, j = keys.length; i < j; ++i) {
        obj[keys[i]] = values[i];
      }
    }
    
    return struct;
  }
  
  // Final export
  if (typeof module !== "undefined") {
    module.exports = definition();
  }
  else if (typeof define !== "undefined") {
    define(definition);
  }
})(this);