import { fireEvent, render } from '@testing-library/react';
import React from 'react';
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

  it('updatePosition when offsetTop changed', async () => {
    const onChange = jest.fn();
    jest.useFakeTimers();
    render(<Affix offsetTop={0} onChange={onChange} />);
    jest.runAllTimers();
    fireEvent.scroll(window, { target: { scrollY: -100 } });
    expect(onChange).toBeCalled();
  });
});
