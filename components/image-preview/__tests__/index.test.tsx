import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ImagePreview } from '../ImagePreview';
import { images, originImages } from '../../../tests/testData/images';
import Carousel from '../../carousel';
import { Images } from '../PropsType';

describe('ImagePreview', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
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

  it('should load origin url for first image', () => {
    let onloadRef: typeof Image.prototype.onload;
    let srcRef: string;
    const onloadSymbol = Symbol('onload');
    const srcSymbol = Symbol('src');
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this[onloadSymbol];
      },
      set(onload) {
        onloadRef = onload;
        this[onloadSymbol] = onload;
      },
      configurable: true,
    });
    Object.defineProperty(Image.prototype, 'src', {
      get() {
        return this[srcSymbol];
      },
      set(src) {
        srcRef = src;
        this[srcSymbol] = src;
      },
      configurable: true,
    });
    jest.useFakeTimers();
    const wrapper = mount(<ImagePreview images={originImages} visible />);
    wrapper.find('.za-image-preview__origin__button').simulate('click');
    expect((wrapper.state('images') as Images)[0]).toEqual({
      url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_1.png',
      originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
      loaded: 'loadStart',
    });
    onloadRef();
    expect((wrapper.state('images') as Images)[0]).toEqual({
      url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
      originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
      loaded: 'loadEnd',
    });
    jest.advanceTimersByTime(1500);
    expect((wrapper.state('images') as Images)[0]).toEqual({
      url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
      originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
      loaded: 'loadAfter',
    });
    expect(srcRef!).toEqual('https://static.zhongan.com/website/health/zarm/images/banners/1.png');
  });
});
