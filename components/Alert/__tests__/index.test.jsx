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
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
