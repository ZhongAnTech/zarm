import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tab from '../index';

describe('Tab', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Tab>
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

  it('canSwipe', () => {
    const wrapper = render(
      <Tab canSwipe>
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

  it('lineWidth is auto', () => {
    const wrapper = shallow(
      <Tab lineWidth="auto">
        <Tab.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tab.Panel>
        <Tab.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tab.Panel>
      </Tab>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ lineWidth: 30 });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Tab onChange={onChange}>
        <Tab.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tab.Panel>
        <Tab.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tab.Panel>
      </Tab>
    );
    wrapper.setProps({ value: 1 });
  });

  it('click tabs', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tab canSwipe onChange={onChange}>
        <Tab.Panel title="选项卡1" disabled>
          <div>试试点我左滑</div>
        </Tab.Panel>
        <Tab.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tab.Panel>
      </Tab>
    );
    wrapper.find('.za-tab-header-item').first().simulate('click');
    wrapper.find('.za-tab-header-item').last().simulate('click');
    expect(onChange).toBeCalledWith(1);
  });
});
