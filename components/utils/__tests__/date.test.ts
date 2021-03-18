import dateUtils from '../date';

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
    });
  });
});
