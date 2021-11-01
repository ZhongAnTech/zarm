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
});
