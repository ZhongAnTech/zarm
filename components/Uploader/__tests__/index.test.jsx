import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Uploader from '../index';

describe('Uploader', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();

    const wrapper = render(
      <Uploader
        accept="image/jpg, image/jpeg, image/gif, image/png"
        onChange={onChange}>
        foo
      </Uploader>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
