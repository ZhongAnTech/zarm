import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toast from '../index';

describe('Toast', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();

    const wrapper = render(
      <Toast visible onMaskClick={onMaskClick}>foo</Toast>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
