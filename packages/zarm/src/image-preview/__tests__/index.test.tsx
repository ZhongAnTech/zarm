/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
import React from 'react';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import ImagePreview from '../ImagePreview';
import { images, originImages } from '../../../tests/testData/images';
// import Carousel from '../../carousel';
// import { Images } from '../interface';
import { sleep } from '../../../tests/utils';
// import ActivityIndicator from '../../activity-indicator';
// import ImagePreviewEnhanced from '../index';

describe('ImagePreview', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<ImagePreview visible onChange={jest.fn()} images={images} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly with origin', () => {
      const wrapper = render(<ImagePreview visible onChange={jest.fn()} images={originImages} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  // it('should pass locale and localeCode props to original component after wrapped by ConfigReceiverWrapper HOC', () => {
  //   /*  @ts-ignore */
  //   const wrapper = mount(<ImagePreviewEnhanced visible images={images} />);
  //   expect(wrapper.find(ImagePreview).prop('locale')).toEqual({
  //     loadBefore: '查看原图',
  //     loadStart: '加载中',
  //     loadEnd: '加载完成',
  //   });
  //   expect(wrapper.find(ImagePreview).prop('localeCode')).toEqual('zh-CN');
  // });

  // it('should get initial derived state from props - 2', () => {
  //   const wrapper = mount(<ImagePreview visible images={images} />);
  //   expect(wrapper.state()).toEqual({
  //     visible: true,
  //     activeIndex: 0,
  //     currentIndex: 0,
  //     images: [
  //       { url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png' },
  //       { url: 'https://static.zhongan.com/website/health/zarm/images/banners/2.png' },
  //       { url: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png' },
  //     ],
  //     prevVisible: true,
  //     prevActiveIndex: 0,
  //     prevImages: [
  //       'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //       'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  //       'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
  //     ],
  //   });
  // });

  // it('should handle onChange event', async () => {
  //   const mOnChange = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onChange={mOnChange} />);
  //   expect(wrapper.state('currentIndex')).toEqual(0);
  //   wrapper.find(Carousel).invoke('onChange')!(1);
  //   expect(wrapper.state('currentIndex')).toEqual(1);
  //   expect(mOnChange).toBeCalledWith(1);
  // });

  // it("should not call onChange event if it's not existed", async () => {
  //   const wrapper = mount(<ImagePreview visible images={images} />);
  //   expect(wrapper.state('currentIndex')).toEqual(0);
  //   wrapper.find(Carousel).invoke('onChange')!(1);
  //   expect(wrapper.state('currentIndex')).toEqual(1);
  // });

  // it('should load origin url for first image', () => {
  //   let onloadRef: typeof Image.prototype.onload;
  //   let srcRef: string;
  //   const onloadSymbol = Symbol('onload');
  //   const srcSymbol = Symbol('src');
  //   Object.defineProperty(Image.prototype, 'onload', {
  //     get() {
  //       return this[onloadSymbol];
  //     },
  //     set(onload) {
  //       onloadRef = onload;
  //       this[onloadSymbol] = onload;
  //     },
  //     configurable: true,
  //   });
  //   Object.defineProperty(Image.prototype, 'src', {
  //     get() {
  //       return this[srcSymbol];
  //     },
  //     set(src) {
  //       srcRef = src;
  //       this[srcSymbol] = src;
  //     },
  //     configurable: true,
  //   });
  //   jest.useFakeTimers();
  //   const wrapper = mount(<ImagePreview images={originImages} visible />);
  //   wrapper.find('.za-image-preview__origin__button').simulate('click');
  //   expect((wrapper.state('images') as Images)[0]).toEqual({
  //     url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_1.png',
  //     originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //     loaded: 'loadStart',
  //   });
  //   expect(wrapper.find(ActivityIndicator).exists()).toBeTruthy();
  //   onloadRef();
  //   expect((wrapper.state('images') as Images)[0]).toEqual({
  //     url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //     originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //     loaded: 'loadEnd',
  //   });
  //   jest.advanceTimersByTime(1500);
  //   expect((wrapper.state('images') as Images)[0]).toEqual({
  //     url: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //     originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  //     loaded: 'loadAfter',
  //   });
  //   expect(srcRef!).toEqual('https://static.zhongan.com/website/health/zarm/images/banners/1.png');
  // });

  it('should render show origin url button if origin url is not existed', () => {
    const wrapper = mount(<ImagePreview images={images} visible />);
    const buttonWrapper = wrapper.find('.za-image-preview__origin__button');
    expect(buttonWrapper.exists()).toBeFalsy();
  });

  // it("should not call onClose handler if user's touch is moving", () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
  //   expect(wrapper.instance()['moving']).toBeUndefined();
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('touchstart').simulate('touchmove').simulate('click');
  //   expect(wrapper.instance()['moving']).toBeTruthy();
  //   expect(mOnClose).not.toBeCalled();
  // });

  // it("should not call onClose handler if user's mouse is moving", () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
  //   expect(wrapper.instance()['moving']).toBeUndefined();
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('mousedown').simulate('mousemove').simulate('click');
  //   expect(wrapper.instance()['moving']).toBeTruthy();
  //   expect(mOnClose).not.toBeCalled();
  // });

  // it("should call onClose handler if user's touch is NOT moving", () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('click');
  //   expect(mOnClose).toBeCalled();
  // });

  it('should not call onClose handler when touch end and the duration between touchstart and touchend greater than 300ms', async () => {
    const mOnClose = jest.fn();
    const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
    const contentWrapper = wrapper.find('.za-image-preview__content');
    contentWrapper.simulate('touchstart').simulate('touchmove');
    await sleep(500);
    contentWrapper.simulate('touchend');
    expect(mOnClose).not.toBeCalled();
  });

  // it('should call onClose handler when touch end and the duration between touchstart and touchend less than 300ms', async () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('touchstart');
  //   await sleep(200);
  //   jest.useFakeTimers();
  //   contentWrapper.simulate('touchend');
  //   jest.advanceTimersByTime(300);
  //   expect(mOnClose).toBeCalledTimes(1);
  //   expect(setTimeout).toBeCalledWith(expect.any(Function), 300);
  // });

  // it("should clear setTimeout schedule if user's touch is moving and previous scheduler exists", async () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('touchstart');
  //   await sleep(200);
  //   jest.useFakeTimers();
  //   contentWrapper.simulate('touchend');
  //   // eslint-disable-next-line prefer-destructuring
  //   const doubleClickTimer = wrapper.instance()['doubleClickTimer'];
  //   contentWrapper.simulate('touchend');
  //   expect(clearTimeout).toBeCalledWith(doubleClickTimer);
  //   expect(mOnClose).not.toBeCalled();
  // });

  it('should not call onClose handler when touch end and the duration between touchstart and touchcancel greater than 300ms', async () => {
    const mOnClose = jest.fn();
    const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
    const contentWrapper = wrapper.find('.za-image-preview__content');
    contentWrapper.simulate('touchstart').simulate('touchmove');
    await sleep(500);
    contentWrapper.simulate('touchcancel');
    expect(mOnClose).not.toBeCalled();
  });

  // it('should call onClose handler when touch end and the duration between touchstart and touchcancel less than 300ms', async () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} onClose={mOnClose} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('touchstart');
  //   await sleep(200);
  //   jest.useFakeTimers();
  //   contentWrapper.simulate('touchcancel');
  //   jest.advanceTimersByTime(300);
  //   expect(mOnClose).toBeCalledTimes(1);
  //   expect(setTimeout).toBeCalledWith(expect.any(Function), 300);
  // });

  // it("should clear setTimeout schedule if user's touch is moving and previous scheduler exists", async () => {
  //   const mOnClose = jest.fn();
  //   const wrapper = mount(<ImagePreview visible images={images} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('touchstart');
  //   await sleep(200);
  //   jest.useFakeTimers();
  //   contentWrapper.simulate('touchcancel');
  //   // eslint-disable-next-line prefer-destructuring
  //   const doubleClickTimer = wrapper.instance()['doubleClickTimer'];
  //   contentWrapper.simulate('touchcancel');
  //   expect(clearTimeout).toBeCalledWith(doubleClickTimer);
  //   expect(mOnClose).not.toBeCalled();
  // });

  // it('should set moving to false and touchStartTime to 0 when mouse up', () => {
  //   const wrapper = mount(<ImagePreview visible images={images} />);
  //   const contentWrapper = wrapper.find('.za-image-preview__content');
  //   contentWrapper.simulate('mousedown').simulate('mousemove');
  //   expect(wrapper.instance()['moving']).toBeTruthy();
  //   expect(wrapper.instance()['touchStartTime']).toBeGreaterThan(0);
  //   jest.useFakeTimers();
  //   contentWrapper.simulate('mouseup');
  //   jest.advanceTimersByTime(1);
  //   expect(wrapper.instance()['moving']).toBeFalsy();
  //   expect(wrapper.instance()['touchStartTime']).toBe(0);
  // });

  it('should render pagination', () => {
    const wrapper = mount(<ImagePreview visible images={images} />);
    const paginationWrapper = wrapper.find('.za-image-preview__index');
    expect(paginationWrapper.exists()).toBeTruthy();
    expect(paginationWrapper.text()).toEqual('1 / 3');
  });

  it('should not render pagination', () => {
    const wrapper = mount(<ImagePreview visible images={images} showPagination={false} />);
    expect(wrapper.find('.za-image-preview__index').exists()).toBeFalsy();
  });

  it('should render images', () => {
    const wrapper = mount(<ImagePreview visible images={images} />);
    const itemWrapper = wrapper.find('.za-image-preview__item');
    expect(itemWrapper).toHaveLength(3);
    const srcArr = itemWrapper.map((w) => w.find('img')).map((v) => v.prop('src'));
    expect(srcArr).toEqual(images);
  });
});
