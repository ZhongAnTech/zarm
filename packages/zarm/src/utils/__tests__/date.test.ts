import dateUtils from '../date';
import { date1 } from '../../../tests/testData/date';

describe('utils', () => {
  describe('date', () => {
    describe('#parseDate', () => {
      it('should parse date if date is an instance of Date', () => {
        const date = new Date(2020, 1, 1);
        const actual = dateUtils.parseDate(date);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toEqual(date);
      });
      it('should parse date if date is a string', () => {
        const date = '2020-01-01';
        const actual = dateUtils.parseDate(date);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toEqual(new Date('2020/01/01'));
      });
      it('should parse date if date is a timestamp string', () => {
        const date = '1612244846140';
        const actual = dateUtils.parseDate(date);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toEqual(new Date(+date));
      });
      it('should parse date if date is timestamp number', () => {
        const date = 1612244846140;
        const actual = dateUtils.parseDate(date);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toEqual(new Date(+date));
      });
    });

    describe('#cloneDate', () => {
      it('should clone date without modifying', () => {
        const actual = dateUtils.cloneDate(date1, 'y', 0);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-04-23T00:00:00.000Z`);
      });
      it('should clone date with incremental year', () => {
        const actual = dateUtils.cloneDate(date1, 'y', 1);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2020-04-23T00:00:00.000Z`);
      });
      it('should clone date with full year', () => {
        const actual = dateUtils.cloneDate(date1, 'yyyy', 2000);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2000-04-23T00:00:00.000Z`);
      });
      it('should clone date with incremental month', () => {
        const actual = dateUtils.cloneDate(date1, 'm', 1);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-05-23T00:00:00.000Z`);
      });
      it('should clone date with full month', () => {
        const actual = dateUtils.cloneDate(date1, 'mm', 10);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-11-23T00:00:00.000Z`);
      });
      it('should clone date with incremental date', () => {
        const actual = dateUtils.cloneDate(date1, 'd', 1);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-04-24T00:00:00.000Z`);
      });
      it('should clone date with full date', () => {
        const actual = dateUtils.cloneDate(date1, 'dd', 20);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-04-20T00:00:00.000Z`);
      });

      it('should clone date with without modifying date if date type is invalid', () => {
        const actual = dateUtils.cloneDate(date1, 'xx' as any, 20);
        expect(actual).toBeInstanceOf(Date);
        expect(actual).toMatchInlineSnapshot(`2019-04-23T00:00:00.000Z`);
      });
    });

    describe('#parseDay', () => {
      it('should parse day', () => {
        const parseDateSpy = jest.spyOn(dateUtils, 'parseDate').mockReturnValueOnce(date1);
        const DateSpy = jest
          .spyOn(global, 'Date')
          .mockReturnValueOnce((date1 as unknown) as string);
        const actual = dateUtils.parseDay(date1);
        expect(actual).toMatchInlineSnapshot(`2019-04-23T00:00:00.000Z`);
        expect(parseDateSpy).toBeCalledWith(date1);
        expect(DateSpy).toBeCalledWith(date1.getFullYear(), date1.getMonth(), date1.getDate());
        DateSpy.mockRestore();
        parseDateSpy.mockRestore();
      });
    });
    describe('#getDay', () => {
      it('should get day with zh_CN locale', () => {
        const date = new Date(2020, 1, 1);
        const actual = dateUtils.getDay(date);
        expect(actual).toEqual('周六');
      });
      it('should get day with en_US locale', () => {
        const date = new Date(2020, 1, 1);
        // eslint-disable-next-line no-sparse-arrays
        const actual = dateUtils.getDay(date, [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]);
        expect(actual).toEqual('Saturday');
      });
    });
    describe('#isOneMonth', () => {
      it('should return false if any date is empty string', () => {
        const date = new Date(2020, 1, 1);
        expect(dateUtils.isOneMonth('', date)).toBeFalsy();
        expect(dateUtils.isOneMonth(date, '')).toBeFalsy();
      });
      it('should return false if the months of the two dates are not equal', () => {
        const date = new Date(2020, 1, 1);
        const date2 = new Date(2020, 2, 1);
        expect(dateUtils.isOneMonth(date2, date)).toBeFalsy();
      });
      it('should return false if the years of the two dates are not equal', () => {
        const date = new Date(2020, 1, 1);
        const date2 = new Date(2021, 2, 1);
        expect(dateUtils.isOneMonth(date2, date)).toBeFalsy();
      });
      it('should return true if the months of the two dates are equal', () => {
        const date = new Date(2020, 1, 1);
        const date2 = '2020-01-31T16:00:00.000Z';
        expect(dateUtils.isOneMonth(date2, date)).toBeFalsy();
      });
    });

    describe('#isOneDay', () => {
      it('should return false if any date is empty string', () => {
        const date = new Date(2020, 1, 1);
        expect(dateUtils.isOneDay('', date)).toBeFalsy();
        expect(dateUtils.isOneDay(date, '')).toBeFalsy();
      });
      it('should return true if the dates of the two dates are equal', () => {
        const date = new Date(2020, 1, 1);
        const date2 = new Date(2020, 1, 1);
        expect(dateUtils.isOneDay(date2, date)).toBeTruthy();
      });
    });

    describe('#isToday', () => {
      it('should return true if date is today', () => {
        const actual = dateUtils.isToday(new Date());
        expect(actual).toBeTruthy();
      });
      it('should return false if date is not today', () => {
        const actual = dateUtils.isToday(new Date(2020, 1, 1));
        expect(actual).toBeFalsy();
      });
    });

    describe('#getMonthCount', () => {
      it('should get month difference include both of the months', () => {
        const date = new Date(2020, 10);
        const date2 = new Date(2020, 1);
        const actual = dateUtils.getMonthCount(date, date2);
        expect(actual).toEqual(10);
      });
    });

    describe('#isLeapYear', () => {
      it('should throw error if year is invalid', () => {
        const invalidYears = ['', NaN, Infinity, 20.2, '20.2'];
        expect.assertions(invalidYears.length);
        invalidYears.forEach((year) => {
          expect(() => dateUtils.isLeapYear(year)).toThrow('年份格式不正确');
        });
      });

      it('should throw error if year is number less than 1790', () => {
        const years = [0, '3', '222', 333, 333.0];
        expect.assertions(years.length);
        years.forEach((year) => {
          expect(() => dateUtils.isLeapYear(year)).toThrow('年份不能低于1790');
        });
      });

      it('should return true if year is leap year', () => {
        const leapYears = [2000, 2004];
        expect.assertions(leapYears.length);
        leapYears.forEach((y) => {
          expect(dateUtils.isLeapYear(y)).toBeTruthy();
        });
      });
    });

    describe('#getCurrMonthInfo', () => {
      it('should get the information of current month', () => {
        expect(dateUtils.getCurrMonthInfo(2000, 1)).toEqual({ dayCount: 29, firstDay: 2 });
      });
    });

    describe('#getDaysInMonth', () => {
      it('should get days by date', () => {
        expect(dateUtils.getDaysByDate(new Date(2020, 1, 1))).toEqual(29);
      });
    });

    describe('#getDaysInMonth', () => {
      it('should get days in month', () => {
        expect(dateUtils.getDaysInMonth(2020, 1)).toEqual(31);
      });
    });

    describe('#firstDayOfMonth', () => {
      it('should get the first day of a month if date is an instance of Date', () => {
        expect(dateUtils.firstDayOfMonth(new Date(2020, 1, 1))).toEqual(6);
      });
      it('should get the first day of a month if date is a date string', () => {
        expect(dateUtils.firstDayOfMonth('Sat Feb 01 2020')).toEqual(6);
      });
    });
  });
});
