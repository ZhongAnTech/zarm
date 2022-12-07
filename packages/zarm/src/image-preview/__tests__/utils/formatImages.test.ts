import formatImages from '../../utils/formatImages';
import { images, originImages } from '../../../../tests/testData/images';

describe('formatImages', () => {
  it('should transfer image string to image object with url property', () => {
    const actual = formatImages(images);
    expect(actual).toEqual([
      { src: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png' },
      { src: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png' },
      { src: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png' },
    ]);
  });

  it('should add loaded property to image object', () => {
    const actual = formatImages(originImages);
    expect(actual).toEqual([
      {
        src: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_1.png',
        originSrc: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
        loaded: 'loadBefore',
      },
      {
        src: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_2.png',
        originSrc: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
        loaded: 'loadBefore',
      },
      {
        src: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_3.png',
        originSrc: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
        loaded: 'loadBefore',
      },
    ]);
  });
});
