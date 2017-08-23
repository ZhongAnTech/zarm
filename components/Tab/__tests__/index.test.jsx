import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tab from '../index';

describe('Tab', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();

    const wrapper = render(
      <Tab canSwipe onChange={onChange}>
        <Tab.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tab.Panel>
        <Tab.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tab.Panel>
      </Tab>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
