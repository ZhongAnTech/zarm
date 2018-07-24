import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Swipe from '../index';

describe('Swipe', () => {
  it('renders correctly', () => {
    const ITEMS = ['1', '2', '3'];
    const wrapper = render(
      <Swipe>
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Swipe>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('loop renders correctly', () => {
    const ITEMS = ['1', '2', '3'];
    const wrapper = render(
      <Swipe loop>
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Swipe>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoPlay', () => {
    jest.useFakeTimers();
    const ITEMS = ['1', '2', '3'];
    const onChange = jest.fn();
    const wrapper = mount(
      <Swipe
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
      </Swipe>
    );
    wrapper.setProps({ activeIndex: 1 });
    jest.runTimersToTime(20000);
    wrapper.unmount();
  });

  it('autoPlay and direction is right', () => {
    jest.useFakeTimers();
    const ITEMS = ['1', '2', '3'];
    const wrapper = mount(
      <Swipe autoPlay direction="right">
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Swipe>
    );
    wrapper.setProps({ activeIndex: 1 });
    jest.runTimersToTime(3000);
  });

  it('touch event', () => {
    const onChangeEnd = jest.fn();
    const ITEMS = ['1', '2', '3'];
    const wrapper = mount(
      <Swipe onChangeEnd={onChangeEnd} direction="right">
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Swipe>
    ).find('.za-swipe-items');
    wrapper.simulate('touchStart', {
      touches: [10, 0],
    });
    wrapper.simulate('touchMove', {
      touches: [100, 0],
    });
    wrapper.simulate('touchEnd', {
      touches: [200, 0],
    });
  });

  it('pagination event', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    const ITEMS = ['1', '2', '3'];
    class Test extends React.Component {
      render() {
        return (
          <Swipe onChange={onChange} onChangeEnd={onChangeEnd} direction="right">
            {
              ITEMS.map((item, i) => {
                return (
                  <div key={+i}>{item}</div>
                );
              })
            }
          </Swipe>
        );
      }
    }
    const wrapper = mount(<Test />);

    wrapper
      .find('.za-swipe-pagination li')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.za-swipe-pagination li')
        .at(0)
        .hasClass('active')
    ).toBe(true);

    // wrapper.ref('swipeRef').onSlideTo(2);

    // wrapper.simulate('touchStart', {
    //   touches: [10, 0],
    // });
    // wrapper.simulate('touchMove', {
    //   touches: [100, 0],
    // });
    // wrapper.simulate('touchEnd', {
    //   touches: [200, 0],
    // });
    // wrapper
    //   .find('.za-swipe-pagination li')
    //   .at(2)
    //   .simulate('click');
    // // jest.runAllTimers();
    // expect(onChange).toHaveBeenCalled();
    // expect(onChangeEnd).toHaveBeenCalled();
  });
});
