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

  it('DatePicker', () => {
    const wrapper = render(
      <Picker.Date mode="date" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('StackPicker', () => {
    const wrapper = render(
      <Picker.Stack
        dataSource={[
          {
            value: '1',
            label: '北京市',
            children: [
              { value: '11', label: '海淀区' },
              { value: '12', label: '西城区' },
            ],
          },
          {
            value: '2',
            label: '上海市',
            children: [
              { value: '21', label: '黄埔区' },
              { value: '22', label: '虹口区' },
            ],
          },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
