import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Affix from '../index';

describe('Affix', () => {
  it('offsetTop', () => {
    const wrapper = render(
      <Affix offsetTop={20}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('offsetBottom', () => {
    const wrapper = render(
      <Affix offsetBottom={20}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
