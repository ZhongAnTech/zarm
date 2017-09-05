import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popup from '../index';

describe('Popup', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = shallow(
      <Popup
        direction="bottom"
        onMaskClick={onMaskClick}
        onClose={onClose}>
        foo
      </Popup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ visible: true });
  });

  it('duration', () => {
    const wrapper = shallow(
      <Popup duration={0}>foo</Popup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ visible: true });
  });

  it('autoClose', () => {
    const wrapper = shallow(
      <Popup autoClose>foo</Popup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ visible: true });
  });
});
