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
});
