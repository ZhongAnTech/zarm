import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoticeBar from '../index';

describe('NoticeBar', () => {
  it('renders correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(<NoticeBar>foo</NoticeBar>);
    jest.runTimersToTime(3000);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('theme', () => {
    const wrapper = render(<NoticeBar theme="error">foo</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(<NoticeBar icon={<img alt="" src="https://zhongantecheng.github.io/zarm/images/state.18e78939.png" />}>foo</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoscroll', () => {
    jest.useFakeTimers();
    const wrapper = mount(<NoticeBar autoscroll>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>);
    jest.runTimersToTime(3000);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
