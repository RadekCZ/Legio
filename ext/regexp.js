'use strict';

var specials = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g;
RegExp.escape = function (str) { return str.replace(specials, "\\$1"); };
