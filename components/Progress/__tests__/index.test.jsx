import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Progress from '../index';

describe('Progress', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Progress percent={10}>foo</Progress>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
