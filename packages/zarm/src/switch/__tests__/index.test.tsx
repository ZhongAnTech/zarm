import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('#getChecked', () => {
    it('should initialize state with props.checked', () => {
      const wrapper1 = shallow(<Switch checked />);
      expect(wrapper1.state('checked')).toBeTruthy();
      const wrapper2 = shallow(<Switch checked={false} />);
      expect(wrapper2.state('checked')).toBeFalsy();
    });

    it('should initialize state with props.defaultChecked', () => {
      const wrapper1 = shallow(<Switch defaultChecked />);
      expect(wrapper1.state('checked')).toBeTruthy();
      const wrapper2 = shallow(<Switch defaultChecked={false} />);
      expect(wrapper2.state('checked')).toBeFalsy();
    });

    it('should initialize state with default value', () => {
      const wrapper1 = shallow(<Switch />);
      expect(wrapper1.state('checked')).toBeFalsy();
    });
  });

  describe('static getDerivedStateFromProps', () => {
    it('should get derived state from props.checked', () => {
      expect(Switch.getDerivedStateFromProps({ checked: false })).toEqual({ checked: false });
      expect(Switch.getDerivedStateFromProps({ checked: true })).toEqual({ checked: true });
    });
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
      expect(inputWrapper.prop('checked')).toBeTruthy();
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
      expect(inputWrapper.prop('checked')).toBeTruthy();
    });

    it('should handle change event without updating state', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch checked onChange={onChange} />);
      expect(wrapper.state('checked')).toBeTruthy();
      wrapper.find('input').simulate('change');
      expect(onChange).toBeCalledWith(false);
      expect(wrapper.state('checked')).toBeTruthy();
      expect(wrapper.find('input').prop('value')).toEqual('on');
    });

    it('should handle change event and update state if props.checked is not existed', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch onChange={onChange} />);
      expect(wrapper.state('checked')).toBeFalsy();
      expect(wrapper.find('input').prop('value')).toEqual('off');
      wrapper.find('input').simulate('change');
      expect(onChange).toBeCalledWith(true);
      expect(wrapper.state('checked')).toBeTruthy();
      expect(wrapper.find('input').prop('value')).toEqual('on');
    });

    it('should do nothing if switch is disabled', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch disabled onChange={onChange} />);
      expect(wrapper.hasClass('za-switch--disabled')).toBeTruthy();
      expect(wrapper.find('input').prop('disabled')).toBeTruthy();
      wrapper.find('input').simulate('change');
      expect(onChange).not.toBeCalled();
    });

    it('should get derived state from nextProps', () => {
      const getDerivedStateFromPropsSpy = jest.spyOn(Switch, 'getDerivedStateFromProps');
      const wrapper = shallow(<Switch />);
      expect(wrapper.state('checked')).toBeFalsy();
      expect(getDerivedStateFromPropsSpy).toBeCalledWith(
        {
          prefixCls: 'za-switch',
          disabled: false,
        },
        { checked: false },
      );
      wrapper.setProps({ checked: true });
      expect(wrapper.state('checked')).toBeTruthy();
      expect(getDerivedStateFromPropsSpy).toBeCalledWith(
        {
          prefixCls: 'za-switch',
          disabled: false,
          checked: true,
        },
        { checked: false },
      );
    });

    it('receive new checked when disabled', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Switch disabled onChange={onChange} />);
      wrapper.find('input').simulate('change', { target: { checked: true } });
      expect(onChange).not.toBeCalled();
    });
  });
});
