import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pull from '../index';

describe('Pull', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('loading', () => {
    const wrapper = shallow(
      <Pull>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Pull>
    );
    wrapper.setProps({ loading: true });
  });
});
