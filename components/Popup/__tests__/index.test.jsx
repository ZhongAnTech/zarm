import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popup from '../index';

describe('Popup', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = render(
      <Popup
        visible
        direction="bottom"
        onMaskClick={onMaskClick}
        onClose={onClose}>
        foo
      </Popup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
