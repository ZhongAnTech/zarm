import getClosestPoint from '../../utils/getClosestPoint';

describe('#getClosestPoint', () => {
  it.each`
    val   | marks                     | step | min  | max    | expected
    ${10} | ${{ '1.2': '', '3': '' }} | ${1} | ${3} | ${4}   | ${4}
    ${10} | ${{}}                     | ${1} | ${3} | ${4}   | ${4}
    ${10} | ${null}                   | ${1} | ${3} | ${4}   | ${4}
    ${0}  | ${null}                   | ${1} | ${3} | ${4}   | ${0}
    ${10} | ${null}                   | ${2} | ${4} | ${100} | ${10}
  `(
    'closest point should be $expected when val is $val, marks is $marks, step is $step, min is $min, max is $max',
    ({ val, marks, step, min, max, expected }) => {
      expect(getClosestPoint(val, { marks, step, min, max })).toEqual(expected);
    },
  );

  it('should throw error when min > max', () => {
    expect(() => getClosestPoint(0, { marks: {}, step: 1, min: 6, max: 4 })).toThrowError(
      `"max" should be greater than "min". Got "min" = 6, "max" = 4`,
    );
  });
});
