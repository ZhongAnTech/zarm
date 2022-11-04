import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Affix from '../index';

describe('Affix', () => {
  it('offsetTop', () => {
    const wrapper = render(
      <Affix offsetTop={20}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('offsetBottom', () => {
    const wrapper = render(
      <Affix offsetBottom={20}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('getAffixed is true test of offsetTop', async () => {
    const wrapper = render(
      <Affix offsetTop={100000}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
