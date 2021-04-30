import React from 'react';
import { Alert } from 'react-native';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoticeBar from '../index.native';

describe('NoticeBar', () => {
  it('renders correctly', () => {
    const wrapper = render(<NoticeBar>错误色</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<NoticeBar theme="danger">This is a NoticeBar</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('scroll', () => {
    const wrapper = render(
      <NoticeBar scrollable>
        各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。
      </NoticeBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const wrapper = render(
      <NoticeBar onClick={() => Alert.alert('click this message!')}>NoticeBar</NoticeBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('closable', () => {
    const wrapper = render(<NoticeBar closable>可关闭</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
