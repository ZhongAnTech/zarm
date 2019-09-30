import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Confirm from '../index';
import Modal from '../../modal';

describe('Confirm', () => {
  it('renders correctly', () => {
    const onOk = jest.fn();
    const onCancel = jest.fn();

    const wrapper = render(
      <Confirm
        radius
        visible
        title="确认信息"
        message="你确定要这样做吗？"
        onOk={onOk}
        onCancel={onCancel}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with static methods', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();
    const modal = Modal.confirm({
      title: '静态调用的title',
      message: '静态调用的body，使用promise关闭',
      onCancel,
      onOk,
    });

    document.querySelector('.za-confirm__button--ok').click();

    expect(onOk).toBeCalledTimes(1);
    expect(modal).resolves.toBe(true);
  });
});
