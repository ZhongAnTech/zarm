import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ImagePreview from '../index';

const images = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

const originImages = [
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_1.png',
    originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  },
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_2.png',
    originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  }, {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_3.png',
    originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
  },
];

describe('ImagePreview', () => {
  it('renders correctly', () => {
    const wrapper = render(<ImagePreview checked onChange={jest.fn()} images={images} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with origin', () => {
    const wrapper = render(<ImagePreview checked onChange={jest.fn()} images={originImages} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
