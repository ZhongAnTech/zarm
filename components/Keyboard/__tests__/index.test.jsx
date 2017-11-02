import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Keyboard from '../index';

describe('Keyboard', () => {
  it('renders correctly', () => {
    const wrapper = render(<Keyboard />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is price', () => {
    const wrapper = render(<Keyboard type="price" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is idcard', () => {
    const wrapper = render(<Keyboard type="idcard" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('click keyboard', () => {
    const onKeyClick = jest.fn();
    const wrapper = shallow(<Keyboard onKeyClick={onKeyClick} />);
    const keys = wrapper.find('.za-keyboard-key');
    expect(keys.childAt(0).text()).toBe('1');
    keys.childAt(0).simulate('click');
    expect(onKeyClick).toBeCalledWith('1');
    keys.childAt(9).simulate('click');
    keys.childAt(11).simulate('click');
    expect(onKeyClick).toBeCalledWith('close');

    const handles = wrapper.find('.za-keyboard-handle');
    handles.childAt(0).simulate('click');
    expect(onKeyClick).toBeCalledWith('delete');
    handles.childAt(1).simulate('click');
    expect(onKeyClick).toBeCalledWith('ok');
  });
});

describe('Keyboard.Picker', () => {
  it('renders correctly', () => {
    const wrapper = render(<Keyboard.Picker />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible', () => {
    const wrapper = shallow(<Keyboard.Picker />);
    wrapper.setProps({ visible: true });
    wrapper.setProps({ visible: false });
  });

  it('click keyboard', () => {
    const onKeyClick = jest.fn();
    const wrapper = shallow(<Keyboard.Picker visible onKeyClick={onKeyClick} />);
    const keys = wrapper.find(Keyboard).dive().find('.za-keyboard-key');
    const handles = wrapper.find(Keyboard).dive().find('.za-keyboard-handle');
    keys.childAt(0).simulate('click');
    expect(onKeyClick).toBeCalledWith('1');
    handles.childAt(1).simulate('click');
  });
});
