import showOriginButton from '../../utils/showOriginButton';
import { originImages } from '../../../../tests/testData/images';

describe('showOriginButton', () => {
  it('should return true if image has originSrc', () => {
    const actual = showOriginButton(originImages, 1);
    expect(actual).toBeTruthy();
  });

  it('should return false if image does not have originSrc', () => {
    const actual = showOriginButton([{ src: 'a' }, { src: 'b' }], 0);
    expect(actual).toBeFalsy();
  });

  it('should return false if image not found', () => {
    const actual = showOriginButton([{ src: 'a' }, { src: 'b' }], 2);
    expect(actual).toBeFalsy();
  });

  it('should return false if index is undefined', () => {
    const actual = showOriginButton([{ src: 'a' }, { src: 'b' }]);
    expect(actual).toBeFalsy();
  });
});
