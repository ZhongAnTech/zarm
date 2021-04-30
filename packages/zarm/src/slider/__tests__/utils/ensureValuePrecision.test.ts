import { mocked } from 'ts-jest/utils';
import ensureValuePrecision from '../../utils/ensureValuePrecision';
import getClosestPoint from '../../utils/getClosestPoint';
import getPrecision from '../../utils/getPrecision';

jest.mock('../../utils/getClosestPoint');
jest.mock('../../utils/getPrecision');

const mGetClosestPoint = mocked(getClosestPoint);
const mGetPrecision = mocked(getPrecision);

describe('ensureValuePrecision', () => {
  const baseProps = {
    min: 0,
    max: 100,
    marks: '',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should return closest point if it is a finite number and step is 0', () => {
    mGetClosestPoint.mockReturnValue(10);
    const actual = ensureValuePrecision(1, { ...baseProps, step: 0 });
    expect(actual).toEqual(10);
    expect(mGetClosestPoint.mock.calls).toEqual([
      [1, { ...baseProps, step: 0 }],
      [1, { ...baseProps, step: 0 }],
    ]);
  });
  it('should return 0 if closest point is NOT a finite number and step is 0', () => {
    mGetClosestPoint.mockReturnValue(100 / 0);
    const actual = ensureValuePrecision(1, { ...baseProps, step: 0 });
    expect(actual).toEqual(0);
    expect(mGetClosestPoint.mock.calls).toEqual([[1, { ...baseProps, step: 0 }]]);
  });
  it('should return closest point number with precision', () => {
    mGetClosestPoint.mockReturnValue(10);
    mGetPrecision.mockReturnValueOnce(2);
    const actual = ensureValuePrecision(1, { ...baseProps, step: 10 });
    expect(actual).toEqual(10);
    expect(mGetClosestPoint.mock.calls).toEqual([
      [1, { ...baseProps, step: 10 }],
      [1, { ...baseProps, step: 10 }],
    ]);
    expect(mGetPrecision).toBeCalledWith(10);
  });
});
