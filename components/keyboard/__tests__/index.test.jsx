import React from 'react';
import { render, mount } from 'enzyme';
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
    const wrapper = mount(<Keyboard onKeyClick={onKeyClick} />);
    const keys = wrapper.find('.za-keyboard__keys');
    expect(keys.childAt(0).text()).toBe('1');
    keys.childAt(0).simulate('click');
    expect(onKeyClick).toBeCalledWith('1');
    keys.childAt(9).simulate('click');
    keys.childAt(11).simulate('click');
    expect(onKeyClick).toBeCalledWith('close');

    const handles = wrapper.find('.za-keyboard__handle');
    handles.childAt(0).simulate('touchstart');
    expect(onKeyClick).toBeCalledWith('delete');
    handles.childAt(1).simulate('click');
    expect(onKeyClick).toBeCalledWith('ok');
  });
});
