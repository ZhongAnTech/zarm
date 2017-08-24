import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoticeBar from '../index';

describe('NoticeBar', () => {
  it('renders correctly', () => {
    const wrapper = render(<NoticeBar>foo</NoticeBar>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
