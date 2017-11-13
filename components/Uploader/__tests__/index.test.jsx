import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Uploader from '../index';

describe('Uploader', () => {
  it('renders correctly', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      children: 'foo',
    };
    const wrapper = render(<Uploader {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handle default click', () => {
    const onClickfn = jest.fn();
    const props = {
      accept: 'image/*',
      onClick: onClickfn,
      children: 'foo',
    };
    const wrapper = mount(<Uploader {...props} />);
    wrapper.find('.za-uploader-input').simulate('click');
    wrapper.find('.za-uploader-trigger').simulate('click');
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
    const wrapper = mount(<Uploader {...props} />);
    wrapper.find('.za-uploader-input').simulate('change');
    // expect(props.onChange).toBeCalled();
  });
});
