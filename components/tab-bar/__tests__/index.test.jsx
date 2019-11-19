import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TabBar from '../index';

const activeIcon = (
  <div style={{
    width: '24px',
    height: '24px',
    background: 'url(//cdn-health.zhongan.com/zarm/home-active.svg) top left / 24px 24px no-repeat',
  }}
  />
);

const icon = (
  <div style={{
    width: '24px',
    height: '24px',
    background: 'url(//cdn-health.zhongan.com/zarm/home.svg) top left / 24px 24px no-repeat',
  }}
  />
);

describe('ActivityIndicator', () => {
  const onChange = jest.fn();
  it('renders correctly', () => {
    const wrapper = render(
      <TabBar onChange={onChange}>
        <TabBar.Item
          itemKey="home"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
        />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('with defaultActiveKey', () => {
    const wrapper = render(
      <TabBar defaultActiveKey="home">
        <TabBar.Item
          itemKey="home"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
        />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('with activeKey', () => {
    const wrapper = render(
      <TabBar activeKey="home">
        <TabBar.Item
          itemKey="home"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
        />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onChange', () => {
    const wrapper = mount(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBar.Item
          itemKey="home"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
        />
      </TabBar>,
    );

    wrapper.find('.za-tab-bar__item').first().simulate('click');
    expect(onChange).toBeCalledWith('home');
  });

  it('with badge onChange', () => {
    const wrapper = mount(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBar.Item
          itemKey="badge"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
          badge={{ shape: 'circle', text: '3' }}
        />
      </TabBar>,
    );

    wrapper.find('.za-tab-bar__item').first().simulate('click');
    expect(onChange).toBeCalledWith('badge');
  });
});
