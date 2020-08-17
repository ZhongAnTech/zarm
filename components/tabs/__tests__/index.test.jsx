import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

describe('Tab', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Tabs>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly vertical', () => {
    const wrapper = render(
      <Tabs direction="vertical">
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('canSwipe', () => {
    const wrapper = render(
      <Tabs swipeable>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('lineWidth is auto', () => {
    const wrapper = shallow(
      <Tabs lineWidth="auto">
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ lineWidth: 30 });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Tabs onChange={onChange}>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    wrapper.setProps({ value: 1 });
  });

  it('click tabs', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tabs canSwipe onChange={onChange}>
        <Tabs.Panel title="选项卡1" disabled>
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    wrapper.find('.za-tabs__tab').at(1).simulate('click');
    expect(onChange).toBeCalledWith(1);
    wrapper.find('.za-tabs__tab').last().simulate('click');
    expect(onChange).toBeCalledWith(2);
  });

  it('scroll tabs', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tabs swipeable onChange={onChange} scrollable>
        <Tabs.Panel title="选项卡1" disabled>
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡4">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡5">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    wrapper.find('.za-tabs__tab').last().simulate('click');
    expect(onChange).toBeCalledWith(4);
  });
});
