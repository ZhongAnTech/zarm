import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Swipe from '../index';

describe('Swipe', () => {
  it('renders correctly', () => {
    const ITEMS = ['1', '2', '3'];
    const onChange = jest.fn();

    const wrapper = render(
      <Swipe
        loop
        direction="left"
        onChange={onChange}>
        {
          ITEMS.map((item, i) => {
            return (
              <div key={+i}>{item}</div>
            );
          })
        }
      </Swipe>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
