import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NumKeyboard from '../index';

describe('NumKeyboard', () => {
  const props = {
    type: 'tle',
    visible: true,
  };

  it('render correctly', () => {
    const wrapper = render(<NumKeyboard {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('key button press', () => {
    const keyCallback = jest.fn();
    const wrapper = shallow(<NumKeyboard keyCallback={keyCallback} {...props} />);
    (wrapper.find('.key-btn').first()).simulate('click');
    expect(keyCallback).toBeCalled();
  });

  it('done button press', () => {
    const doneCallback = jest.fn();
    const wrapper = shallow(<NumKeyboard doneCallback={doneCallback} {...props} />);
    (wrapper.find('.op-zone').childAt(0)).simulate('click');
    expect(doneCallback).toBeCalled();
  });
});