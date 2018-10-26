const moment = require('moment');
const TimeTurner = require('../src/time_turner');

describe('initialization', () => {
  it('should return initial time', () => {
    const tt = new TimeTurner(moment());
    expect(moment.isMoment(tt.initialTime)).toBe(true);
  });

  it('should default to now for no arguments', () => {
    const tt = new TimeTurner();
    const now = moment();
    const format = 'YYYY MM DD hh mm';
    expect(tt.initialTime.format(format)).toEqual(now.format(format));
  });
});

describe('changing days', () => {
  it('should do day math', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '11/7/2180';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    const type = 'days';

    tt.addDay();
    expect(tt.toString()).toEqual(asMoment.add(1, type).toString());
    let number = 52;
    tt.addManyDays(number);
    expect(tt.toString()).toEqual(asMoment.add(number, type).toString());
  });

  it('should do hour math', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '01/05/2010';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    const type = 'hours';

    tt.addHour();
    expect(tt.toString()).toEqual(asMoment.add(1, type).toString());
    let number = 4;
    tt.addManyHours(number);
    expect(tt.toString()).toEqual(asMoment.add(number, type).toString());

    tt.subtractHour();
    expect(tt.toString()).toEqual(asMoment.subtract(1, type).toString());
    number = 12;
    tt.subtractManyHours(number);
    expect(tt.toString()).toEqual(asMoment.subtract(number, type).toString());
  });
});

describe('should iterate', () => {
  it('add days continously', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '11/7/2180';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    let counter = 0;
    const times = 3;
    for (let _ of tt.byDays().forwards.until(asMoment.add(times, 'days'))) {
      counter += 1;
    }
    expect(counter).toBe(times);
    expect(tt.toString()).toBe(asMoment.toString());
  });

  it('add hours continously', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '11/7/2180';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    let counter = 0;
    const times = 3;
    for (let _ of tt.byHours().forwards.until(asMoment.add(times, 'hours'))) {
      counter += 1;
    }
    expect(counter).toBe(times);
    expect(tt.toString()).toBe(asMoment.toString());
  });

  it('subtract days continously', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '11/7/2180';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    let counter = 0;
    const times = 18;
    for (let _ of tt.byDays().backwards.until(asMoment.subtract(times, 'days'))) {
      counter += 1;
    }
    expect(counter).toBe(times);
    expect(tt.toString()).toBe(asMoment.toString());
  });

  it('subtract hours continously', () => {
    const format = 'MM/DD/YYYY HH:mm:ss';
    const date = '11/7/2180';
    const tt = new TimeTurner(date, format);
    const asMoment = moment(date, format);

    let counter = 0;
    const times = 13;
    for (let _ of tt.byHours().backwards.until(asMoment.subtract(times, 'hours'))) {
      counter += 1;
    }
    expect(counter).toBe(times);
    expect(tt.toString()).toBe(asMoment.toString());
  });
});
