import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Portal from '../Portal';
import Popup from '../Popup';

describe('Popup', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const wrapper = mount(
        <Popup direction="bottom" onMaskClick={onMaskClick} afterClose={afterClose}>
          foo
        </Popup>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders mount node correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const wrapper = mount(
        <Popup
          visible
          direction="bottom"
          onMaskClick={onMaskClick}
          afterClose={afterClose}
          mountContainer={() => document.body}
        >
          foo
        </Popup>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should render portal if props.visible is truthy', () => {
    const wrapper = shallow(<Popup visible />);
    expect(wrapper.state()).toEqual({ renderPortal: true, portalVisible: true });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not render portal if props.visible is falsy', () => {
    const wrapper = shallow(<Popup />);
    expect(wrapper.state()).toEqual({ renderPortal: false, portalVisible: false });
    expect(wrapper.find(Portal).exists()).toBeFalsy();
  });

  it('should create portal ref', () => {
    const wrapper = mount(<Popup visible />);
    // eslint-disable-next-line dot-notation
    expect(wrapper.instance()['portalRef']).toBeInstanceOf(Portal);
  });

  it('should destroy(unmount) portal from component tree', () => {
    const wrapper = shallow(<Popup visible destroy />);
    // eslint-disable-next-line dot-notation
    wrapper.instance()['handlePortalUnmount']();
    expect(wrapper.state()).toEqual({ renderPortal: false, portalVisible: true });
    expect(wrapper.find(Portal).exists()).toBeFalsy();
  });

  it('should not destroy(unmount) portal from componen tree but set to invisible', () => {
    const wrapper = shallow(<Popup visible destroy={false} />);
    // eslint-disable-next-line dot-notation
    wrapper.instance()['handlePortalUnmount']();
    expect(wrapper.state()).toEqual({ renderPortal: true, portalVisible: false });
    expect(wrapper.find(Portal).exists()).toBeTruthy();
    expect(wrapper.find(Portal).prop('visible')).toBeFalsy();
  });

  it('should pass correct props to Portal', () => {
    const wrapper = shallow(<Popup visible />);
    expect(wrapper.prop('destroy')).toBeUndefined();
  });
});
