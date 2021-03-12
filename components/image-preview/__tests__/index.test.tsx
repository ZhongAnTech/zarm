import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ImagePreview } from '../ImagePreview';
import { images, originImages } from '../../../tests/testData/images';
import Carousel from '../../carousel';

describe('ImagePreview', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = mount(<ImagePreview visible onChange={jest.fn()} images={images} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly with origin', () => {
      const wrapper = mount(<ImagePreview visible onChange={jest.fn()} images={originImages} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should get initial derived state from props', () => {
    const state = ImagePreview.getDerivedStateFromProps(
      { ...ImagePreview.defaultProps, visible: true, images },
      {
        visible: true,
        images: [
          { url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png' },
          { url: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png' },
          { url: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png' },
        ],
      },
    );
    expect(state).toEqual({
      visible: true,
      activeIndex: 0,
      currentIndex: 0,
      images: [
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png' },
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png' },
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png' },
      ],
      prevVisible: true,
      prevActiveIndex: 0,
    });
  });

  it('should get initial derived state from props - 2', () => {
    const wrapper = mount(<ImagePreview visible images={images} />);
    expect(wrapper.state()).toEqual({
      visible: true,
      activeIndex: 0,
      currentIndex: 0,
      images: [
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png' },
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png' },
        { url: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png' },
      ],
      prevVisible: true,
      prevActiveIndex: 0,
    });
  });

  it('should handle onChange event', async () => {
    const mOnChange = jest.fn();
    const wrapper = mount(<ImagePreview visible images={images} onChange={mOnChange} />);
    expect(wrapper.state('currentIndex')).toEqual(0);
    wrapper.find(Carousel).invoke('onChange')!(1);
    expect(wrapper.state('currentIndex')).toEqual(1);
    expect(mOnChange).toBeCalledWith(1);
  });
});
