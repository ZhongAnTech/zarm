import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilePicker from '../index';

describe('FilePicker', () => {
  it('renders correctly', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      children: 'foo',
    };
    const wrapper = render(<FilePicker {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handle default click', () => {
    const onClickfn = jest.fn();
    const props = {
      accept: 'image/*',
      onClick: onClickfn,
      children: 'foo',
    };
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-filepicker-input').simulate('click');
    wrapper.find('.za-filepicker-trigger').simulate('click');
    // expect(onClickfn).toBeCalled();
  });

  it('select file', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      multiple: true,
      onBeforeSelect: jest.fn(),
      children: <button>+</button>,
    };
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-filepicker-input').simulate('change');
    // expect(props.onChange).toBeCalled();
  });
});
