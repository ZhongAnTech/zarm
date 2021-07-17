import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TabBar from '../index';
import Badge from '../../badge';

const TabBarItem = TabBar.Item;

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
    expect(mOnChange).toBeCalled();
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

describe('TabBar', () => {
  describe('snapshot', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <TabBar>
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('with defaultActiveKey', () => {
      const wrapper = render(
        <TabBar defaultActiveKey="home">
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('with activeKey', () => {
      const wrapper = render(
        <TabBar activeKey="home">
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should handle change event', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
      </TabBar>,
    );

    wrapper.find('.za-tab-bar__item').first().simulate('click');
    expect(onChange).toBeCalledWith('home');
  });

  it('should select first tab bar item if activeKey and defaultActivceKey are not existed', () => {
    const wrapper = shallow(
      <TabBar visible={false} className="test">
        <TabBarItem itemKey="home" title="主页" />
        <TabBarItem itemKey="about us" title="关于我们" />
      </TabBar>,
    );
    expect(wrapper.childAt(0).prop('selected')).toBeTruthy();
    expect(wrapper.childAt(1).prop('selected')).toBeFalsy();
  });

  it('should render actionIcon if selected is false(defaultActivceKey is not equal with itemKey)', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBarItem
          itemKey="badge"
          title="主页"
          icon={icon}
          activeIcon={activeIcon}
          badge={{ shape: 'circle', text: '3' }}
        />
      </TabBar>,
    );
    wrapper.find(TabBarItem).first().simulate('click');
    expect(onChange).toBeCalledWith('badge');
    expect(wrapper.find('.za-tab-bar__icon').contains(activeIcon)).toBeTruthy();
  });

  it('should selected tab bar item if activeKey is equal with itemKey', () => {
    const wrapper = shallow(
      <TabBar defaultActiveKey="home">
        <TabBarItem itemKey="home" title="主页" />
      </TabBar>,
    );
    expect(wrapper.find(TabBarItem).prop('selected')).toBeTruthy();
  });

  it('should use element index as the fallback itemKey', () => {
    const wrapper = shallow(
      <TabBar>
        <TabBarItem />
        <TabBarItem />
      </TabBar>,
    );
    expect(wrapper.childAt(0).prop('itemKey')).toBe(0);
    expect(wrapper.childAt(1).prop('itemKey')).toBe(1);
  });

  it('should have hidden class name if visible prop is false', () => {
    const wrapper = shallow(
      <TabBar visible={false} className="test">
        <TabBarItem itemKey="home" title="主页" />
      </TabBar>,
    );
    expect(wrapper.hasClass('test')).toBeTruthy();
    expect(wrapper.hasClass('za-tab-bar')).toBeTruthy();
    expect(wrapper.hasClass('za-tab-bar--hidden')).toBeTruthy();
  });

  it('should render children with extra props', () => {
    const wrapper = shallow(
      <TabBar visible={false} className="test">
        <TabBarItem itemKey="home" title="主页" />
        <TabBarItem itemKey="about us" title="关于我们" />
      </TabBar>,
    );
    expect(wrapper.childAt(0).props()).toEqual(
      expect.objectContaining({
        title: '主页',
        itemKey: 'home',
        onChange: expect.any(Function),
        selected: true,
      }),
    );
    expect(wrapper.childAt(1).props()).toEqual(
      expect.objectContaining({
        title: '关于我们',
        itemKey: 'about us',
        onChange: expect.any(Function),
        selected: false,
      }),
    );
  });
});
