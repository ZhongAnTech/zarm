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
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
