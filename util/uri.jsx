#module Legio.URI (
  Legio = "../std" = Legio
)

var enc = encodeURI, dec = decodeURI, encC = encodeURIComponent, decC = decodeURIComponent;

var URI = {
  encode: enc,
  decode: dec,
  encodeComponent: encC,
  decodeComponent: decC,
  
  create: obj -> {
    var str = "", ch = "";
    
    for (var i in obj) if (Object.owns(obj, i)) {
      str += ch + encC(i) + "=" + encC(obj[i]);
      ch = "&";
    }
    
    return str; // .slice(0, -1);
  },
  
  parse: str -> {
    var obj = {}, parts = str.split("&"), part;
    
    for (var i = 0; i < parts.length; ++i) {
      part = parts[i].split("=");
      obj[decC(part[0])] = decC(part[1]);
    }
    
    return obj;
  }
};

URI.stringify = URI.create;

#export URI;
