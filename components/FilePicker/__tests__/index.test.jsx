import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilePicker from '../index';

describe('FilePicker', () => {
  it('renders correctly', () => {
    const props = {
      onChange: jest.fn(),
      children: <div>add</div>,
    };
    const wrapper = render(<FilePicker {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('select file', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      multiple: true,
      onBeforeSelect: jest.fn(),
      children: <div>add</div>,
    };
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-filepicker-input').simulate('change');
    // expect(props.onChange).toBeCalled();
  });
});
