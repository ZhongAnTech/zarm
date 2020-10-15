import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Scroller from '../index';

const list = [];
for (let i = 0; i < 100; i++) {
  list.push(<li key={+i}>第 {i + 1} 行</li>);
}

describe('Scroller', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Scroller />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
