import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Slider from '../index';

describe('Slider', () => {
  it('renders correctly', () => {
    const wrapper = render(<Slider />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('min', () => {
    const wrapper = render(<Slider min={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('max', () => {
    const wrapper = render(<Slider max={100} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('step', () => {
    const wrapper = render(<Slider step={5} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Slider disabled />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const wrapper = render(<Slider defaultValue={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('value', () => {
    const wrapper = render(<Slider value={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('set new value', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Slider />);
    wrapper.setProps({ value: 50 });
    jest.runAllTimers();
    wrapper.unmount();
  });

  // it('touch event', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(<Slider min={0} max={100} step={5} onChange={onChange} />).find('.za-slider-handle');
  //   wrapper.simulate('touchStart', {
  //     touches: [10, 0],
  //   });
  //   wrapper.simulate('touchMove', {
  //     touches: [100, 0],
  //   });
  //   wrapper.simulate('touchEnd', {
  //     touches: [300, 0],
  //   });

  //   // expect(onChange).toBeCalled();
  // });

  it('touch event', () => {
    const wrapper = mount(<Slider disabled />).find('.za-slider-handle');
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
});
