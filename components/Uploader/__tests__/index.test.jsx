import React from 'react';
import { render } from 'enzyme';
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

  // it('simulate click event', () => {
  //   const props = {
  //     accept: 'image/jpg, image/jpeg, image/gif, image/png',
  //     onChange: jest.fn(),
  //     onBeforeSelect: jest.fn(),
  //     children: <button>+</button>,
  //   };
  //   const wrapper = mount(<Uploader {...props} />);
  //   wrapper.find('input[type="file"]').simulate('change');
  //   expect(props.onChange).toBeCalled();
  // });
});
