import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onCancel = jest.fn();

    const wrapper = mount(
      <Modal visible onMaskClick={onMaskClick} closable title="标题" onCancel={onCancel}>
        foo
      </Modal>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('onClose', () => {
    const onCancel = jest.fn();
    const wrapper = mount(
      <Modal visible title="标题" closable onCancel={onCancel}>
        模态框内容
      </Modal>,
    );
    wrapper.find('.za-modal__header__close').at(0).simulate('click');
    expect(onCancel).toBeCalled();
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
    wrapper.find('.za-popup__wrapper').simulate('click');
  });
});
