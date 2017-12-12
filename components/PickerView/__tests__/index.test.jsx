import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import PickerView from '../index';

describe('PickerView', () => {
  it('PickerView render visible', () => {
    const wrapper = render(
      <PickerView
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
