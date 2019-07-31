import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Confirm from '../index';

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

  it('works with static methods', () => {
    const onCancel = jest.fn();
    const promise = Confirm.show({
      title: '警告',
      message: '这是警告信息',
      onCancel,
    });
    document.querySelector('.za-confirm__button').click();

    expect(onCancel).toBeCalledTimes(1);

    return expect(promise).resolves.toBe(false);
  });
});
