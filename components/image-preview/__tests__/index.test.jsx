import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ImagePreview from '../index';

const images = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

describe('ImagePreview', () => {
  it('renders correctly', () => {
    const wrapper = render(<ImagePreview checked onChange={jest.fn()} images={images} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
