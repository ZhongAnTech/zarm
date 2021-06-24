import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<Switch />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('defaultChecked', () => {
      const wrapper = render(<Switch defaultChecked />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('should switch on if defaultChecked is true', () => {
      const wrapper = shallow(<Switch defaultChecked />);
      const inputWrapper = wrapper.find('input');
      expect(inputWrapper.prop('disabled')).toBeFalsy();
      expect(inputWrapper.prop('value')).toEqual('on');
      expect(inputWrapper.prop('defaultChecked')).toBeTruthy();
    });

    it('should switch off and disabled', () => {
      const wrapper = shallow(<Switch disabled />);
      const inputWrapper = wrapper.find('input');
      expect(inputWrapper.prop('disabled')).toBeTruthy();
      expect(inputWrapper.prop('value')).toEqual('off');
      expect(inputWrapper.prop('checked')).toBeFalsy();
    });

    it('should switch on and disabled', () => {
      const wrapper = shallow(<Switch defaultChecked disabled />);
      const inputWrapper = wrapper.find('input');
      expect(inputWrapper.prop('disabled')).toBeTruthy();
      expect(inputWrapper.prop('value')).toEqual('on');
      expect(inputWrapper.prop('defaultChecked')).toBeTruthy();
    });

    it('should handle change event without updating state', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch checked onChange={onChange} />);
      wrapper.find('input').simulate('change');
      expect(onChange).toBeCalledWith(false);
      expect(wrapper.find('input').prop('value')).toEqual('on');
    });

    it('should handle change event and update state if props.checked is not existed', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch onChange={onChange} />);
      expect(wrapper.find('input').prop('value')).toEqual('off');
      wrapper.find('input').simulate('change');
      expect(onChange).toBeCalledWith(true);
    });
  });
});
