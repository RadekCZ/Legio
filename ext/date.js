'use strict';

var
DateProto = Date.prototype;

if (!Date.now) {
  Date.now = function () { return +(new Date()); };
}

DateProto.getISODay = function () { return this.getDay() || 7; }

DateProto.getWeek = function () {
  var d = new Date(+this);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

DateProto.getWeekYear = function () {
  var d  = new Date(+this);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  return d.getFullYear();
};
