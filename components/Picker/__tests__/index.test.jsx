import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Picker from '../index';

describe('Picker', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
