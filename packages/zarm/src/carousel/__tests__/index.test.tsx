import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Image from '../../image';
import Carousel from '../index';

const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
const IMGLIST = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

const contentRender = () => {
  return IMGLIST.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <Image src={item} alt="" draggable={false} />
      </div>
    );
  });
};

const createCarousel = (props?, childrenLen = 3) => {
  const ITEMS = Array.from({ length: childrenLen }).map((_v, i) => i);
  return (
    <Carousel {...props}>
      {ITEMS.map((item, index) => {
        return <div key={+index}>{item}</div>;
      })}
    </Carousel>
  );
};

describe('Carousel', () => {
  it('base render correctly', () => {
    const wrapper = render(
      <div>
        {createCarousel()}
        {createCarousel({}, 0)}
        {createCarousel({ activeIndex: 1 }, 0)}
        {createCarousel({}, 1)}
      </div>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('style render correctly', () => {
    const style = { background: 'red' };
    const wrapper = render(createCarousel({ style }, 0));
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('prefixCls render correctly', () => {
    const prefixCls = 'za-test';
    const wrapper = render(createCarousel({ prefixCls }, 1));
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('className render correctly', () => {
    const className = 'za-wrapper-test';
    const wrapper = render(createCarousel({ className }, 0));
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('height render correctly', () => {
    const wrapper = render(createCarousel({ height: 150, direction: 'vertical' }));
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('pagination render correctly', () => {
    const wrapper = render(
      <div>
        {createCarousel({ showPagination: true })}
        {createCarousel({ showPagination: false })}
      </div>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  // it('activeIndex', () => {
  //   const wrapper = mount(createCarousel({ activeIndex: 1 }));
  //   expect(wrapper.state('activeIndex')).toEqual(1);
  // });

  it('swipeable', () => {
    const wrapper = render(createCarousel({ swipeable: false }));
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('autoPlay', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const animationDuration = 200;
    const autoPlayIntervalTime = 1000;
    const props = { autoPlay: true, animationDuration, autoPlayIntervalTime };
    render(createCarousel({ ...props, onChange }));

    act(() => {
      jest.advanceTimersByTime(autoPlayIntervalTime);
    });
    expect(onChange).toBeCalledWith(1);
  });

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 375 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 200 });
  });
  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetWidth!);
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight!);
  });

  it('swipe change horizontal', () => {
    const onChange = jest.fn();
    const { container } = render(<Carousel onChange={onChange}>{contentRender()}</Carousel>);
    const element = container.querySelector('.za-carousel');
    fireEvent.mouseDown(element!, { pointerId: 1, clientX: 0, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element!, { pointerId: 1, clientX: -200, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element!, { pointerId: 1, clientX: -275 });
    expect(onChange).toBeCalledTimes(1);
  });

  it('swipe change vertical', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Carousel onChange={onChange} direction="vertical" loop>
        {contentRender()}
      </Carousel>,
    );
    const element = container.querySelector('.za-carousel');
    fireEvent.mouseDown(element!, { pointerId: 1, clientX: 50, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element!, { pointerId: 1, clientX: 50, clientY: -100, buttons: 1 });
    fireEvent.mouseUp(element!, { pointerId: 1, clientX: 50, clientY: -350 });
    expect(onChange).toBeCalledTimes(1);
  });

  it('transitionend event', () => {
    const onChangeEnd = jest.fn();
    const { container } = render(createCarousel({ onChangeEnd }));
    fireEvent.click(container.getElementsByClassName('za-carousel__pagination__item')[1]);
    fireEvent.transitionEnd(container.getElementsByClassName('za-carousel__items')[0]);
    expect(onChangeEnd).toBeCalledWith(1);
  });
});
