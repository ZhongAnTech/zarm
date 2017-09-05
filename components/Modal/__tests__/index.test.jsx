import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../index';

describe('Modal', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();
    const onClose = jest.fn();

    const wrapper = shallow(
      <Modal visible onMaskClick={onMaskClick}>
        <Modal.Header title="标题" onClose={onClose} />
        <Modal.Body>
          foo
        </Modal.Body>
      </Modal>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find(Modal.Header).dive().find('.za-modal-header-close').simulate('click');
    expect(onClose).toBeCalled();
  });
});
