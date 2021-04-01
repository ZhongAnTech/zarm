import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeyboardPicker from '../index';

describe('KeyboardPicker', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = mount(<KeyboardPicker />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should handle number key click event', () => {
    const mOnKeyClick = jest.fn();
    const wrapper = mount(<KeyboardPicker visible onKeyClick={mOnKeyClick} />);
    expect(wrapper.state('visible')).toBeTruthy();
    wrapper.find('.za-keyboard__item').at(0).simulate('click');
    expect(mOnKeyClick).toBeCalledWith('1');
    expect(wrapper.state('visible')).toBeTruthy();
  });

  it('should handle "ok" key click event', () => {
    const mOnKeyClick = jest.fn();
    const wrapper = mount(<KeyboardPicker visible onKeyClick={mOnKeyClick} />);
    expect(wrapper.state('visible')).toBeTruthy();
    wrapper.find('.za-keyboard__item--ok').simulate('click');
    expect(mOnKeyClick).toBeCalledWith('ok');
    expect(wrapper.state('visible')).toBeTruthy();
  });
});
