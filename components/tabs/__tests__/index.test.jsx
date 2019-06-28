import React from 'react';
import { mount } from 'enzyme';
import Tabs from '../index';

const createPanel = (props, content = '选项卡内容', index) => {
  return (
    <Tabs.Panel {...props} key={index}>
      <div >{content}</div>
    </Tabs.Panel>
  );
};
const createTabs = (props, childrenLen = []) => {
  return (
    <Tabs {...props}>
      {
        childrenLen.map((item, index) => {
          return createPanel({
            title: item.title || `选项卡${index}`,
            selected: item.selected || false,
          }, item.content, index);
        })
      }
    </Tabs>
  );
};

const createDefaultChild = (len) => {
  return Array.from({ length: len }, (v, k) => { return { title: `选项卡${k}`, content: `选项卡内容${k}` }; });
};

const touchXtouches = (offsetx) => {
  return { touches: [{ pageX: offsetx, pageY: 1 }] };
};
describe('Tab', () => {
  it('点击到两边界限 swipeable', () => {
    const onChange = jest.fn();
    const props = { useTabPaged: true, swipeable: true, tabWidth: 80, scrollElastic: true };
    const wrapper = mount(
      createTabs({ ...props, onChange }, createDefaultChild(10))
    );
    wrapper.find('.za-tabs__header__item').at(4).simulate('click');
    wrapper.find('.za-tabs__header__item').at(8).simulate('click');
  });

  it('scrollElastic 允许弹性 left right ,page', () => {
    const onChange = jest.fn();
    const props = { useTabPaged: true, swipeable: true, scrollElastic: true };
    const wrapper = mount(
      createTabs({ ...props, onChange }, createDefaultChild(8))
    );
    const wrapperUL = wrapper.find('.za-tabs__header ul');
    wrapperUL.simulate('touchStart', touchXtouches(440))
      .simulate('touchMove', touchXtouches(-280))
      .simulate('touchEnd');
    wrapperUL.simulate('touchStart', touchXtouches(280))
      .simulate('touchMove', touchXtouches(700))
      .simulate('touchEnd');
    wrapper.setProps({ scrollElastic: false });
    wrapperUL.simulate('touchStart', { touches: [1, 1] })
      .simulate('touchMove', touchXtouches(280))
      .simulate('touchEnd');
    wrapperUL.simulate('touchStart', touchXtouches(440))
      .simulate('touchMove', touchXtouches(-280))
      .simulate('touchEnd');
    wrapperUL.simulate('touchStart', touchXtouches(280))
      .simulate('touchMove', touchXtouches(700))
      .simulate('touchEnd');
  });

  it('tabindexchange, valuechange, lineWidth, tabWidth', () => {
    const wrapper = mount(
      createTabs({ lineWidth: 80, tabWidth: 80 }, createDefaultChild(10))
    );
    wrapper.find('.za-tabs__header__item').at(4).simulate('click');
    wrapper.setProps({ activeKey: 1 });
  });
  it('activeKey selected, not useTabPaged, not horizontal', () => {
    mount(
      createTabs({ useTabPaged: false, horizontal: false }, [{
        selected: true,
      }, { }])
    );
  });
});
