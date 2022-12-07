import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabBar from '../index';

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
    const { container } = render(<TabBarItem itemKey="1" badge={{ shape: 'leaf' }} />);
    expect(container.querySelectorAll('.za-tab-bar__item')).toHaveLength(1);
    // expect(wrapper.prop('style')).toBeUndefined();
    expect(container.querySelector('.za-badge')).toBeTruthy();
    expect(container.querySelector('.za-badge--leaf')).toBeTruthy();
  });

  it('should render with content', () => {
    const { container } = render(
      <TabBarItem itemKey="1" title={<h1>test</h1>} icon={<span>test icon</span>} />,
    );
    const tabIcon = container.querySelector('.za-tab-bar__icon');
    expect(tabIcon).toBeTruthy();
    expect(tabIcon?.children).toHaveLength(1);
    expect(tabIcon?.children[0].textContent).toBe('test icon');
    expect(tabIcon?.children[0].tagName).toBe('SPAN');
    const title = container.querySelector('.za-tab-bar__title');
    expect(title).toBeTruthy();
    expect(title?.querySelector('h1')?.textContent).toBe('test');
  });

  it('should handle change event', () => {
    const mOnChange = jest.fn();
    const { container } = render(<TabBarItem itemKey={1} onChange={mOnChange} />);
    fireEvent.click(container.querySelector('.za-tab-bar__item')!);
    expect(mOnChange).toBeCalled();
  });

  it('should render with icon if it is selected', () => {
    const { container } = render(
      <TabBarItem itemKey="1" selected title={<h1>test</h1>} icon={<span>test icon</span>} />,
    );
    expect(container.querySelector('.za-tab-bar__item')?.className).toEqual(
      'za-tab-bar__item za-tab-bar__item--active',
    );
    expect(container.querySelector('.za-tab-bar__icon span')?.textContent).toEqual('test icon');
  });

  it('should render with active icon if it is selected', () => {
    const { container } = render(
      <TabBarItem itemKey="1" selected title={<h1>test</h1>} icon={<span>active icon</span>} />,
    );
    expect(container.querySelector('.za-tab-bar__icon span')?.textContent).toEqual('active icon');
  });

  it('should render inline style', () => {
    const { container } = render(
      <TabBarItem itemKey="1" style={{ color: 'red', display: 'flex' }} />,
    );
    const tab = container.querySelector('.za-tab-bar__item');
    const style = window.getComputedStyle(tab!);
    expect(style).toHaveProperty('color', 'red');
    expect(style).toHaveProperty('display', 'flex');
  });
});

describe('TabBar', () => {
  describe('snapshot', () => {
    it('should render correctly', () => {
      const { container } = render(
        <TabBar>
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(container).toMatchSnapshot();
    });

    it('with defaultActiveKey', () => {
      const { container } = render(
        <TabBar defaultActiveKey="home">
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(container).toMatchSnapshot();
    });

    it('with activeKey', () => {
      const { container } = render(
        <TabBar activeKey="home">
          <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
        </TabBar>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('should handle change event', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TabBar defaultActiveKey="home" onChange={onChange}>
        <TabBarItem itemKey="home" title="主页" icon={icon} activeIcon={activeIcon} />
      </TabBar>,
    );

    const el = container.querySelectorAll('.za-tab-bar__item')[0];
    fireEvent.click(el);
    expect(onChange).toBeCalledWith('home');
  });

  it('should select first tab bar item if activeKey and defaultActivceKey are not existed', () => {
    const { container } = render(
      <TabBar visible={false} className="test">
        <TabBarItem itemKey="home" title="主页" />
        <TabBarItem itemKey="about us" title="关于我们" />
      </TabBar>,
    );
    const el = container.querySelectorAll('.za-tab-bar__item');
    expect(el[0].className).toEqual('za-tab-bar__item za-tab-bar__item--active');
    expect(el[1].className).toEqual('za-tab-bar__item');
  });

  it('should render actionIcon if selected is false(defaultActivceKey is not equal with itemKey)', () => {
    const onChange = jest.fn();
    const { container } = render(
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
    const el = container.querySelectorAll('.za-tab-bar__item');
    // wrapper.find(TabBarItem).first().simulate('click');
    fireEvent.click(el[0]);
    expect(onChange).toBeCalledWith('badge');
  });

  it('should selected tab bar item if activeKey is equal with itemKey', () => {
    const { container } = render(
      <TabBar defaultActiveKey="home">
        <TabBarItem itemKey="home" title="主页" />
      </TabBar>,
    );
    const el = container.querySelectorAll('.za-tab-bar__item');
    expect(el[0].className).toEqual('za-tab-bar__item za-tab-bar__item--active');
  });

  // it('should use element index as the fallback itemKey', () => {
  //   const wrapper = shallow(
  //     <TabBar>
  //       <TabBarItem />
  //       <TabBarItem />
  //     </TabBar>,
  //   );
  //   expect(wrapper.childAt(0).prop('itemKey')).toBe(0);
  //   expect(wrapper.childAt(1).prop('itemKey')).toBe(1);
  // });

  it('should have hidden class name if visible prop is false', () => {
    const { container } = render(
      <TabBar visible={false} className="test">
        <TabBarItem itemKey="home" title="主页" />
      </TabBar>,
    );
    const el = container.querySelector('.za-tab-bar');
    expect(el?.classList.contains('test')).toBeTruthy();
    expect(el?.classList.contains('za-tab-bar')).toBeTruthy();
    expect(el?.classList.contains('za-tab-bar--hidden')).toBeTruthy();
  });

  // it('should render children with extra props', () => {
  //   const wrapper = shallow(
  //     <TabBar visible={false} className="test">
  //       <TabBarItem itemKey="home" title="主页" />
  //       <TabBarItem itemKey="about us" title="关于我们" />
  //     </TabBar>,
  //   );
  //   expect(wrapper.childAt(0).props()).toEqual(
  //     expect.objectContaining({
  //       title: '主页',
  //       itemKey: 'home',
  //       onChange: expect.any(Function),
  //       selected: true,
  //     }),
  //   );
  //   expect(wrapper.childAt(1).props()).toEqual(
  //     expect.objectContaining({
  //       title: '关于我们',
  //       itemKey: 'about us',
  //       onChange: expect.any(Function),
  //       selected: false,
  //     }),
  //   );
  // });
});
