import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import SegmentedControl from '../index';

describe('SegmentedControl', () => {
  it('renders default correctly', () => {
    const OnChange = jest.fn();
    const wrapper = render(
      <SegmentedControl
        shape="round"
        items={['选项1', '选项2']}
        onChange={OnChange}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders selectIndex correctly', () => {
    const OnChange = jest.fn();
    const wrapper = render(
      <SegmentedControl
        shape="round"
        selectIndex={1}
        items={['选项1', '选项2']}
        onChange={OnChange}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  
});
