import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../index';

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

  it('works with static methods', () => {
    const onCancel = jest.fn();
    const promise = Alert.show({
      title: '警告',
      message: '这是警告信息',
      onCancel,
    });
    document.querySelector('.za-alert__button').click();

    expect(onCancel).toBeCalledTimes(1);
    return expect(promise).resolves.toBe(false);
  });
});
