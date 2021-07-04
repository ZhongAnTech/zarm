import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Carousel from '../index';

const createCarousel = (props, childrenLen = 3) => {
  const ITEMS = Array.from({ length: childrenLen }).map((v, i) => i);
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
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('style render correctly', () => {
    const style = { background: 'red' };
    const wrapper = render(createCarousel({ style }, 0));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('prefixCls render correctly', () => {
    const prefixCls = 'za-test';
    const wrapper = render(createCarousel({ prefixCls }, 1));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('className render correctly', () => {
    const className = 'za-wrapper-test';
    const wrapper = render(createCarousel({ className }, 0));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('height render correctly', () => {
    const wrapper = render(createCarousel({ height: 150, direction: 'top' }));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('pagination render correctly', () => {
    const wrapper = render(
      <div>
        {createCarousel({ showPagination: true })}
        {createCarousel({ showPagination: false })}
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('activeIndex', () => {
  //   const wrapper = mount(createCarousel({ activeIndex: 1 }));
  //   expect(wrapper.state('activeIndex')).toEqual(1);
  // });

  it('swipeable', () => {
    const wrapper = mount(createCarousel({ swipeable: false }));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('autoPlay', () => {
  //   jest.useFakeTimers();
  //   const onChange = jest.fn();
  //   const animationDuration = 200;
  //   const autoPlayIntervalTime = 1000;
  //   const props = { autoPlay: true, animationDuration, autoPlayIntervalTime };
  //   const wrapperLeft = mount(createCarousel({ ...props, onChange }));
  //   const wrapperRight = mount(createCarousel({ ...props, direction: 'right' }));

  //   jest.advanceTimersByTime(autoPlayIntervalTime);
  //   expect(wrapperLeft.state('activeIndex')).toEqual(1);
  //   expect(wrapperRight.state('activeIndex')).toEqual(0);
  //   expect(onChange).toBeCalledWith(1);

  //   jest.advanceTimersByTime(10 * autoPlayIntervalTime);
  //   expect(onChange).toHaveBeenCalledTimes(2);
  // });

  // it('loop', () => {
  //   jest.useFakeTimers();
  //   const onChange = jest.fn();
  //   const autoPlayIntervalTime = 1000;
  //   const props = {
  //     loop: true,
  //     autoPlay: true,
  //     autoPlayIntervalTime,
  //     onChange,
  //   };
  //   const wrapper = mount(createCarousel(props, 2));

  //   jest.advanceTimersByTime(autoPlayIntervalTime);
  //   expect(wrapper.state('activeIndex')).toEqual(1);

  //   jest.advanceTimersByTime(autoPlayIntervalTime);
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapper.setState({ direction: 'right' });
  //   jest.advanceTimersByTime(autoPlayIntervalTime);
  //   expect(wrapper.state('activeIndex')).toEqual(1);

  //   jest.advanceTimersByTime(10 * autoPlayIntervalTime);
  //   expect(onChange).toHaveBeenCalledTimes(13);
  // });

  // it('componentWillReceiveProps', () => {
  //   const ITEMS = [1, 2];
  //   const wrapper = mount(createCarousel());
  //   const children = ITEMS.map((item, index) => {
  //     return <div key={+index}>{item}</div>;
  //   });

  //   wrapper.setProps({ children, activeIndex: 1 });
  //   expect(wrapper.state('activeIndex')).toEqual(1);
  //   expect(toJson(render(wrapper))).toMatchSnapshot();

  //   wrapper.setProps({ activeIndex: -1 });
  //   expect(wrapper.state('activeIndex')).toEqual(1);

  //   wrapper.setProps({ activeIndex: 10 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);
  // });

  // it('touchStart', () => {
  //   const wrapper = mount(createCarousel());
  //   const wrapperTouchStart = (wrapperTouch) => {
  //     wrapperTouch.find('.za-carousel__items').simulate('touchStart', {
  //       touches: [
  //         {
  //           pageX: 0,
  //         },
  //       ],
  //     });
  //   };
  //   wrapperTouchStart(wrapper);
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapper.setProps({ activeIndex: 2 });
  //   wrapperTouchStart(wrapper);
  //   expect(wrapper.state('activeIndex')).toEqual(2);
  // });

  // it('touchMove', () => {
  //   const wrapperDirectionX = mount(createCarousel());
  //   const wrapperDirectionY = mount(createCarousel({ direction: 'bottom' }));
  //   const wrapperTouchMove = (wrapper) => {
  //     wrapper
  //       .find('.za-carousel__items')
  //       .simulate('touchStart', {
  //         touches: [
  //           {
  //             pageX: 0,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: -4,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: -5,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 4,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 4 + 5,
  //           },
  //         ],
  //       });
  //   };

  //   Array.of(wrapperDirectionX, wrapperDirectionY).forEach((wrapper) => {
  //     wrapperTouchMove(wrapper);
  //     expect(wrapper.state('activeIndex')).toEqual(0);

  //     wrapper.setProps({ activeIndex: 2 });
  //     wrapperTouchMove(wrapper);
  //     expect(wrapper.state('activeIndex')).toEqual(2);
  //   });
  // });

  // it('touchEnd', () => {
  //   const moveDistanceRatio = 1;
  //   const moveTimeSpan = 200;
  //   const props = { moveDistanceRatio, moveTimeSpan };
  //   const wrapper = mount(createCarousel(props));
  //   const wrapperTouchEnd = ({ direction = 'left', offset = 100, activeIndex = 0 }) => {
  //     wrapper
  //       .setProps({ direction, activeIndex })
  //       .find('.za-carousel__items')
  //       .simulate('touchStart', {
  //         touches: [
  //           {
  //             pageX: 0,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: ['left', 'right'].includes(direction) ? offset : 0,
  //             pageY: ['top', 'bottom'].includes(direction) ? offset : 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchEnd');
  //   };
  //   wrapperTouchEnd({ offset: 0 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapperTouchEnd({ offset: -100 });
  //   expect(wrapper.state('activeIndex')).toEqual(1);

  //   wrapperTouchEnd({ activeIndex: 1, offset: 100 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapperTouchEnd({ direction: 'top', offset: -100 });
  //   expect(wrapper.state('activeIndex')).toEqual(1);
  // });

  // it('unswipeable touchStart', () => {
  //   const wrapper = mount(createCarousel({ swipeable: false }));
  //   const wrapperTouchStart = (wrapperTouch) => {
  //     wrapperTouch.find('.za-carousel__items').simulate('touchStart', {
  //       touches: [
  //         {
  //           pageX: 0,
  //         },
  //       ],
  //     });
  //   };
  //   wrapperTouchStart(wrapper);
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapper.setProps({ activeIndex: 2 });
  //   wrapperTouchStart(wrapper);
  //   expect(wrapper.state('activeIndex')).toEqual(2);
  // });

  // it('unswipeabletouchMove', () => {
  //   const wrapperDirectionX = mount(createCarousel());
  //   const wrapperDirectionY = mount(createCarousel({ direction: 'bottom', swipeable: false }));
  //   const wrapperTouchMove = (wrapper) => {
  //     wrapper
  //       .find('.za-carousel__items')
  //       .simulate('touchStart', {
  //         touches: [
  //           {
  //             pageX: 0,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: -4,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: -5,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 4,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: 4,
  //             pageY: 4 + 5,
  //           },
  //         ],
  //       });
  //   };

  //   Array.of(wrapperDirectionX, wrapperDirectionY).forEach((wrapper) => {
  //     wrapperTouchMove(wrapper);
  //     expect(wrapper.state('activeIndex')).toEqual(0);

  //     wrapper.setProps({ activeIndex: 2 });
  //     wrapperTouchMove(wrapper);
  //     expect(wrapper.state('activeIndex')).toEqual(2);
  //   });
  // });

  // it('unswipeable touchEnd', () => {
  //   const moveDistanceRatio = 1;
  //   const moveTimeSpan = 200;
  //   const props = { moveDistanceRatio, moveTimeSpan, swipeable: false };
  //   const wrapper = mount(createCarousel(props));
  //   const wrapperTouchEnd = ({ direction = 'left', offset = 100, activeIndex = 0 }) => {
  //     wrapper
  //       .setProps({ direction, activeIndex })
  //       .find('.za-carousel__items')
  //       .simulate('touchStart', {
  //         touches: [
  //           {
  //             pageX: 0,
  //             pageY: 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchMove', {
  //         touches: [
  //           {
  //             pageX: ['left', 'right'].includes(direction) ? offset : 0,
  //             pageY: ['top', 'bottom'].includes(direction) ? offset : 0,
  //           },
  //         ],
  //       })
  //       .simulate('touchEnd');
  //   };
  //   wrapperTouchEnd({ offset: 0 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);

  //   wrapperTouchEnd({ offset: -100 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);
  // });

  // it('resize event', () => {
  //   // reference: https://github.com/airbnb/enzyme/issues/426#issuecomment-225912455
  //   const eventMap = {};
  //   window.addEventListener = jest.fn((event, cb) => {
  //     eventMap[event] = cb;
  //   });

  //   const wrapper = mount(createCarousel());
  //   eventMap.resize({ innerWidth: 800 });
  //   expect(wrapper.state('activeIndex')).toEqual(0);
  //   wrapper.unmount();
  // });

  it('transitionend event', () => {
    const onChangeEnd = jest.fn();
    const wrapper = mount(createCarousel({ onChangeEnd }));
    wrapper.find('.za-carousel__pagination .za-carousel__pagination__item').at(1).simulate('click');
    wrapper.find('.za-carousel__items').at(0).simulate('transitionend');
    expect(onChangeEnd).toBeCalledWith(1);
  });
});
