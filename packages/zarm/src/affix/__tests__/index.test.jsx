import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import Affix from '../index';

describe('Affix', () => {
  const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
      wrapper.update();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };
  const waitForComponentToPaint2 = async (wrapper) => {
    await act(async () => {
      wrapper.unmount();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };
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

  it('useEffect test', async () => {
    const wrapper = mount(
      <Affix offsetBottom={20}>
        <div>Affix Node</div>
      </Affix>,
    );

    await waitForComponentToPaint(wrapper);
    await waitForComponentToPaint2(wrapper);
    expect(toJson(wrapper));
  });

  it('getAffixed is true test of offsetTop', async () => {
    const wrapper = render(
      <Affix offsetTop={100000}>
        <div>Affix Node</div>
      </Affix>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
