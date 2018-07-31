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

  it('select image', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      multiple: true,
      onBeforeSelect: jest.fn(),
      quality: 0.3,
      children: <div>add</div>,
    };

    function noOp() {}

    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }
    const myImage = new Image(100, 200);
    myImage.src = './test.jpg';
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-file-picker-input').simulate('change', {
      target: {
        files: [myImage],
      },
    });
    expect(props.onChange).toBeCalled();
  });

  it('select image2', () => {
    const props = {
      accept: 'image/jpg, image/jpeg, image/gif, image/png',
      onChange: jest.fn(),
      multiple: true,
      onBeforeSelect: jest.fn(),
      quality: 0.3,
      children: <div>add</div>,
    };

    function noOp() { }

    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
    }
    const file = new File([''], './test.jpg', {
      type: 'image/jpeg',
    });
    const wrapper = mount(<FilePicker {...props} />);
    wrapper.find('.za-file-picker-input').simulate('change', {
      target: {
        files: [file],
      },
    });
    // expect(props.onChange).toBeCalled();
  });
});
