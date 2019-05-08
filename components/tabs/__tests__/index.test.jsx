import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tabs from '../index';

const createPanel = (props, content, index) => {
  return (
    // eslint-disable-next-line no-undef
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
            title: item.title,
          }, item.content, index);
        })
      }
    </Tabs>
  );
};

const createDefaultChild = (len) => {
  return Array.from({ length: len }, (v, k) => { return { title: `选项卡${k}`, content: `选项卡内容${k}` }; });
};

function createClientXYObject(x, y) {
  return { clientX: x, clientY: y };
}

function createStartTouchEventObject({ x = 0, y = 0, preventDefault = () => {} }) {
  return {
    touches: [createClientXYObject(x, y)],
    preventDefault,
  };
}

function createMoveTouchEventObject(props) {
  const { x = 0, y = 0, includeTouches = true, preventDefault = () => {} } = props;
  const moveTouchEvent = {
    changedTouches: [createClientXYObject(x, y)],
    preventDefault,
  };
  if (includeTouches) moveTouchEvent.touches = [createClientXYObject(x, y)];
  return moveTouchEvent;
}


describe('Tab', () => {
  // it('default selected', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(
  //     <Tabs
  //       onChange={onChange}
  //       canSwipe={false}
  //       useTabPaged
  //     >
  //       <Tabs.Panel title="选项卡1">
  //         <div className="content">选项卡1内容</div>
  //       </Tabs.Panel>
  //       <Tabs.Panel title="选项卡2" isSelected={false}>
  //         <div className="content">选项卡2内容</div>
  //       </Tabs.Panel>
  //     </Tabs>
  //   );
  // });
  it('scrollElastic 禁止弹性 左侧右侧 ', () => {
    const onChange = jest.fn();
    const preventDefault = jest.fn();
    const props = { useTabPaged: true, canSwipe: true, scrollElastic: false };
    const wrapper = mount(
      createTabs({ ...props, onChange }, createDefaultChild(15))
    );
    // wrapper.find('.za-tabs__header').simulate('touchStart', {
    //   touches: [10, 0],
    // })
    //   .simulate('touchMove', {
    //     touches: [-400, 0],
    //   })
    //   .simulate('touchEnd', {
    //     touches: [200, 0],
    //   });
    wrapper.find('.za-tabs__header__item').first().simulate('touchStart', {
      touches: [10, 0],
    })
      .simulate('touchMove', createMoveTouchEventObject({ x: -400, y: 0, preventDefault }))
      .simulate('touchEnd', createMoveTouchEventObject({ x: 275, y: 0, preventDefault }));
    // wrapper.find('.za-tabs__header__item').first().simulate('touchEnd', {
    //   touches: [200, 0],
    // });
    wrapper.find('.za-tabs__header__item').first().simulate('click');
    wrapper.find('.za-tabs__header__item').last().simulate('click');
    expect(onChange).toBeCalledWith(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('tabWidth is Set', () => {
    const wrapper = shallow(
      createTabs({ tabWidth: 80 }, createDefaultChild(2))
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('useTabPaged', () => {
  //   const onChange = jest.fn();
  //   const props = { useTabPaged: true, canSwipe: true };
  //   const wrapper = mount(
  //     createTabs({ ...props, onChange }, createDefaultChild(15))
  //   );
  //   wrapper.find('.za-tabs__header__item').first().simulate('click');
  //   // expect(toJson(wrapper)).toMatchSnapshot();
  //   expect(onChange).toBeCalledWith(0);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
  // it('renders correctly', () => {
  //   const wrapper = render(
  //     createTabs({}, [{
  //       content: '试试点我左滑',
  //     },
  //     { content: '试试点我右滑' },
  //     ])
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('canSwipe', () => {
  //   const wrapper = render(
  //     createTabs({ canSwipe: true }, [{
  //       content: '试试点我左滑',
  //     },
  //     { content: '试试点我右滑' },
  //     ])
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('canNotSwipe', () => {
  //   const wrapper = render(
  //     createTabs({ canSwipe: false }, [{
  //       content: '试试点我左滑',
  //     },
  //     { content: '试试点我右滑' },
  //     ])
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('lineWidth is auto', () => {
    const wrapper = shallow(
      createTabs({ lineWidth: 30 }, [{
        content: '试试点我左滑',
      },
      { content: '试试点我右滑' },
      ])
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    // wrapper.setProps({ lineWidth: 30 });
    // expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('receive new value', () => {
  //   const onChange = jest.fn();
  //   const wrapper = shallow(
  //     createTabs({ onChange }, [{
  //       content: '试试点我左滑',
  //     },
  //     { content: '试试点我右滑' },
  //     ])
  //   );
  //   wrapper.setProps({ value: 1 });
  // });

  // it('click tabs', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(
  //     <Tabs canSwipe onChange={onChange}>
  //       <Tabs.Panel title="选项卡1" disabled>
  //         <div>试试点我左滑</div>
  //       </Tabs.Panel>
  //       <Tabs.Panel title="选项卡2">
  //         <div>试试点我右滑</div>
  //       </Tabs.Panel>
  //     </Tabs>
  //   );
  //   wrapper.find('.za-tabs__header__item').first().simulate('click');
  //   wrapper.find('.za-tabs__header__item').last().simulate('click');
  //   expect(onChange).toBeCalledWith(1);
  // });
});
