import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FakeInput from '../index';

describe('FakeInput', () => {
  const props = {
    placeholder: '请输入手机号',
  };

  it('render correctly', () => {
    const wrapper = render(<FakeInput {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('FakeInput focus', () => {
    const cbFocus = jest.fn();
    const wrapper = mount(<FakeInput cbFocus={cbFocus}/>);
    wrapper.simulate('click');
    expect(cbFocus).toBeCalled();
    wrapper.unmount();
  });
});