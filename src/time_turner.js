const moment = require('moment');

const addHours = date => number => date.add(number, 'hours');
const addDays = date => number => date.add(number, 'days');

const subtractHours = date => number => date.subtract(number, 'hours');
const subtractDays = date => number => date.subtract(number, 'days');

const forwardIterator = unit => (step = 1) => someMoment =>
  function*(timeTurner) {
    const asMoment = moment(someMoment);
    while (timeTurner.reportedTime().isBefore(asMoment)) {
      timeTurner.reportedTime().add(step, unit);
      yield timeTurner;
    }
  };

const backwardsIterator = unit => (step = 1) => someMoment =>
  function*(timeTurner) {
    const asMoment = moment(someMoment);
    while (timeTurner.reportedTime().isAfter(asMoment)) {
      timeTurner.reportedTime().subtract(step, unit);
      yield timeTurner;
    }
  };

function TimeTurner(initialTime = moment(), format) {
  const _initialTime = moment(initialTime, format);
  const _i = initialTime.toString();
  let mutableTime = moment(initialTime, format);

  this.initialTime = _initialTime;

  this.toString = () => mutableTime.toString();
  this.reportedTime = () => mutableTime;
  this.addDay = () => addDays(mutableTime)(1);
  this.subtractDay = () => subtractDays(mutableTime)(1);
  this.addHour = () => addHours(mutableTime)(1);
  this.subtractHour = () => subtractHours(mutableTime)(1);

  this.addManyDays = number => addDays(mutableTime)(number);
  this.subtractManyDays = number => subtractDays(mutableTime)(number);
  this.addManyHours = number => addHours(mutableTime)(number);
  this.subtractManyHours = number => subtractHours(mutableTime)(number);

  this.restart = () => {
    mutableTime = moment(_i, format);
  };

  this.byDays = step => ({
    forwards: {
      until: someMoment => forwardIterator('days')(step)(someMoment)(this)
    },
    backwards: {
      until: someMoment => backwardsIterator('days')(step)(someMoment)(this)
    }
  });

  this.byHours = step => ({
    forwards: {
      until: someMoment => forwardIterator('hours')(step)(someMoment)(this)
    },
    backwards: {
      until: someMoment => backwardsIterator('hours')(step)(someMoment)(this)
    }
  });
}

module.exports = TimeTurner;
