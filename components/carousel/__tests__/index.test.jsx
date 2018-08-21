import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Carousel from '../index';

describe('Carousel', () => {
  it('renders correctly', () => {
    const ITEMS = ['1', '2', '3'];
    const wrapper = render(
      <Carousel>
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('loop renders correctly', () => {
    const ITEMS = ['1', '2', '3'];
    const wrapper = render(
      <Carousel loop>
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoPlay', () => {
    jest.useFakeTimers();
    const ITEMS = ['1', '2', '3'];
    const onChange = jest.fn();
    const wrapper = mount(
      <Carousel
        autoPlay
        onChange={onChange}
      >
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );
    wrapper.setProps({ activeIndex: 1 });
    jest.advanceTimersByTime(20000);
    wrapper.unmount();
  });

  it('autoPlay and direction is right', () => {
    jest.useFakeTimers();
    const ITEMS = ['1', '2', '3'];
    const wrapper = mount(
      <Carousel autoPlay direction="right">
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );
    wrapper.setProps({ activeIndex: 1 });
    jest.advanceTimersByTime(3000);
  });

  it('touch event', () => {
    const onChangeEnd = jest.fn();
    const ITEMS = ['1', '2', '3'];
    const wrapper = mount(
      <Carousel onChangeEnd={onChangeEnd} direction="right">
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );

    wrapper.find('.za-carousel-items')
      .simulate('touchStart', {
        touches: [
          {
            pageX: 0,
          },
        ],
      })
      .simulate('touchMove', {
        touches: [
          {
            pageX: 100,
          },
        ],
      })
      .simulate('touchEnd');

    expect(wrapper.state('activeIndex')).toEqual(0);
  });

  it('pagination event', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    const ITEMS = ['1', '2', '3'];
    const wrapper = mount(
      <Carousel onChange={onChange} onChangeEnd={onChangeEnd} direction="right">
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Carousel>
    );

    wrapper
      .find('.za-carousel-pagination li')
      .at(2)
      .simulate('click');
    expect(
      wrapper
        .find('.za-carousel-pagination li')
        .at(2)
        .hasClass('active')
    ).toBe(true);
  });
});
