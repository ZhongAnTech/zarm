import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TabBar from '../index';
import TabBarItem from '../TabBarItem';
import Badge from '../../badge';

const activeIcon = (
  <div
    style={{
      width: '24px',
      height: '24px',
      background:
        'url(//cdn-health.zhongan.com/zarm/home-active.svg) top left / 24px 24px no-repeat',
    }}
  />
);

const icon = (
  <div
    style={{
      width: '24px',
      height: '24px',
      background: 'url(//cdn-health.zhongan.com/zarm/home.svg) top left / 24px 24px no-repeat',
    }}
  />
);

describe('TabBarItem', () => {
  it('should render with a badge', () => {
    const wrapper = shallow(<TabBarItem itemKey="1" badge={{ theme: 'primary' }} />);
    expect(wrapper.prop('className')).toBe('za-tab-bar__item');
    expect(wrapper.prop('style')).toBeUndefined();
    expect(wrapper.find(Badge)).toBeTruthy();
    expect(wrapper.find(Badge).prop('theme')).toEqual('primary');
  });

  it('should render with content', () => {
    const wrapper = shallow(
      <TabBarItem itemKey="1" title={<h1>test</h1>} icon={<span>test icon</span>} />,
    );
    expect(wrapper.find('.za-tab-bar__icon')).toBeTruthy();
    expect(wrapper.find('.za-tab-bar__icon').children()).toHaveLength(1);
    expect(wrapper.find('.za-tab-bar__icon').children().at(0).text()).toBe('test icon');
    expect(wrapper.find('.za-tab-bar__icon').children().at(0).type()).toBe('span');
    expect(wrapper.find('.za-tab-bar__title')).toBeTruthy();
    expect(wrapper.find('.za-tab-bar__title').contains(<h1>test</h1>)).toBeTruthy();
  });

  it('should handle change event', () => {
    const mOnChange = jest.fn();
    const wrapper = shallow(<TabBarItem itemKey={1} onChange={mOnChange} />);
    wrapper.simulate('click');
    expect(mOnChange).toBeCalledWith(1);
  });

  it('should render with icon if it is selected', () => {
    const wrapper = shallow(
      <TabBarItem itemKey="1" selected title={<h1>test</h1>} icon={<span>test icon</span>} />,
    );
    expect(wrapper.prop('className')).toEqual('za-tab-bar__item za-tab-bar--active');
    expect(wrapper.find('.za-tab-bar__icon').contains(<span>test icon</span>)).toBeTruthy();
  });

  it('should render with active icon if it is selected', () => {
    const wrapper = shallow(
      <TabBarItem itemKey="1" selected title={<h1>test</h1>} icon={<span>active icon</span>} />,
    );
    expect(wrapper.find('.za-tab-bar__icon').contains(<span>active icon</span>)).toBeTruthy();
  });

  it('should render inline style', () => {
    const wrapper = shallow(<TabBarItem itemKey="1" style={{ color: 'red', display: 'flex' }} />);
    expect(wrapper.prop('style')).toHaveProperty('color', 'red');
    expect(wrapper.prop('style')).toHaveProperty('display', 'flex');
  });
});

describe('ActivityIndicator', () => {
  const onChange = jest.fn();
  it('renders correctly', () => {
    const wrapper = render(
      <TabBar onChange={onChange}>
        <TabBar.Item itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('with defaultActiveKey', () => {
    const wrapper = render(
      <TabBar defaultActiveKey="home">
        <TabBar.Item itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('with activeKey', () => {
    const wrapper = render(
      <TabBar activeKey="home">
        <TabBar.Item itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
      </TabBar>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onChange', () => {
    const wrapper = mount(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBar.Item itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
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
