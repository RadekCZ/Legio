(function (global, undefined) {
"use strict";
function definition() {

var Key = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  
  INSERT: 45,
  DELETE: 46,
  
  KEY_0: 48,
  KEY_1: 49,
  KEY_2: 50,
  KEY_3: 51,
  KEY_4: 52,
  KEY_5: 53,
  KEY_6: 54,
  KEY_7: 55,
  KEY_8: 56,
  KEY_9: 57,
  
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  
  NUM_0: 96,
  NUM_1: 97,
  NUM_2: 98,
  NUM_3: 99,
  NUM_4: 100,
  NUM_5: 101,
  NUM_6: 102,
  NUM_7: 103,
  NUM_8: 104,
  NUM_9: 105,
  NUM_STAR: 106,
  NUM_PLUS: 107,
  NUM_MINUS: 109,
  NUM_DOT: 110,
  NUM_SLASH: 111,
  NUM_LOCK: 144,
  
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123
};

return Key;
}
if (typeof module === "object" && module.exports) {
module.exports = definition();
}
else if (typeof define === "function" && define.amd) {
define([], definition);
}
else {
global.Legio.Key = definition();
}
})(this);