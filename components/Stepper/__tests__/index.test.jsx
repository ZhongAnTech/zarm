import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Stepper from '../index';

describe('Stepper', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();

    const wrapper = render(
      <Stepper onChange={onChange} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
