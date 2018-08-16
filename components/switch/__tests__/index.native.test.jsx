import React from 'react';
import { PixelRatio, TouchableWithoutFeedback } from 'react-native';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index.native';
import variables from '../../style/themes/default.native';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = render(<Switch />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Switch defaultChecked />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch checked onChange={onChange} />);
    wrapper.find(TouchableWithoutFeedback).simulate('press', false);
    wrapper.find(TouchableWithoutFeedback).simulate('press', true);
    expect(onChange).toBeCalledWith(true);
  });

  it('disabled', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch checked disabled onChange={onChange} />);
    wrapper.find(TouchableWithoutFeedback).simulate('press', false);
    expect(wrapper.state('checked')).toBe(true);
  });

  it('Switch change styles', () => {
    const styles = {
      wrapperStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: variables.switch_width,
        height: variables.switch_height,
        borderRadius: variables.switch_height / 2,
        backgroundColor: variables.switch_background,
      },
      disabledWrapperStyle: {
        opacity: 0.5,
      },
      wrapperInActive: {
        borderWidth: 3 / PixelRatio.get(),
        borderColor: variables.switch_border_color,
        backgroundColor: '#ffffff',
      },
      wrapperActive: {
        borderWidth: 0,
        backgroundColor: '#12C287',
      },
      circleStyle: {
        width: 29,
        height: 29,
        borderRadius: 15,
        backgroundColor: '#ffffff',
      },
      circleInActive: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'rgba(0,0,0,0.2)',
      },
      circleActive: {
        width: 28,
        height: 27,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowColor: 'rgba(0,127,84,1)',
      },
    };
    const wrapper = shallow(<Switch styles={styles} />);
    wrapper.setProps({ checked: true });
  });
});
