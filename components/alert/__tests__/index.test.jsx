import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../index';
import Modal from '../../modal';

describe('Alert', () => {
  it('renders correctly', () => {
    const onCancel = jest.fn();

    const wrapper = render(
      <Alert
        radius
        visible
        title="警告"
        message="这里是警告信息"
        onCancel={onCancel}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with static methods', () => {
    const onCancel = jest.fn();
    const modal = Modal.alert({
      title: '静态调用的title',
      message: '静态调用的body，使用promise关闭',
      onCancel,
    });
    // const promise = Alert.show({
    //   title: '警告',
    //   message: '这是警告信息',
    //   onCancel,
    // });
    document.querySelector('.za-alert__button').click();

    expect(onCancel).toBeCalledTimes(1);
    expect(modal).resolves.toBe(true);
  });

  // it('close with static methods', () => {
  //   const modal = Modal.alert({
  //     title: '静态调用的title',
  //     message: '静态调用的body，使用promise关闭',
  //   });

  //   document.querySelector('.za-alert__button').click();
  //   expect(modal).resolves.toBe(true);
  // });

  // it('close with async methods', () => {
  //   const onCancel = jest.fn(() => Promise.resolve(true));
  //   const modal = Modal.alert({
  //     title: '静态调用的title',
  //     message: '静态调用的body，使用promise关闭',
  //     onCancel,
  //   });

  //   onCancel();
  //   expect(modal).resolves.toBe(true);
  // });
});
