import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../index';

describe('Modal', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();

    const wrapper = mount(
      <Modal visible onMaskClick={onMaskClick}>
        <Modal.Header title="标题" onClose={onClose} />
        <Modal.Body>foo</Modal.Body>
      </Modal>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('onClose', () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Modal visible>
        <Modal.Header title="标题" onClose={onClose} />
        <Modal.Body>foo</Modal.Body>
      </Modal>
    );
    wrapper.find(Modal.Header).dive().find('.za-modal-header-close').simulate('click');
    expect(onClose).toBeCalled();
  });

  it('receive new visible', () => {
    const wrapper = mount(<Modal>foo</Modal>);
    jest.useFakeTimers();
    wrapper.setProps({ visible: true });
    jest.runAllTimers();
    wrapper.setProps({ visible: false });
    jest.runAllTimers();
  });

  it('click dialog', () => {
    const wrapper = mount(<Modal visible>foo</Modal>);
    wrapper.find('.za-modal-dialog').simulate('click');
  });
});
