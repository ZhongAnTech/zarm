import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popper from '../index';

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

describe('Popper', () => {
  it('renders correctly', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Popper title="标题" onVisibleChange={onVisibleChange}>
        <p>点我</p>
      </Popper>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('check visible prop', () => {
    const wrapper = mount(
      <Popper title="" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <div id="hello">Hello world!</div>
      </Popper>,
    );

    const div = wrapper.find('#hello').at(0);
    div.simulate('mouseover');
    expect(wrapper.instance().props.visible).toBe(false);

    div.simulate('mouseleave');
    expect(wrapper.instance().props.visible).toBe(false);
  });

  it('check hasArrow prop', () => {
    const wrapper = mount(
      <Popper
        trigger="click"
        hasArrow={false}
        title="fdsfsd"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <div id="hello">Hello world!</div>
      </Popper>,
    );

    const div = wrapper.find('#hello').at(0);
    div.simulate('click');
    expect(wrapper.find('.za-popper__arrow')).not.toHaveLength(1);
  });

  it('check onVisibleChange func prop', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(
      <Popper
        trigger="click"
        title="fsdfds"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        onVisibleChange={onVisibleChange}
      >
        <div id="hello">Hello world!</div>
      </Popper>,
    );

    const div = wrapper.find('#hello').at(0);
    div.simulate('click');
    setTimeout(() => {
      expect(onVisibleChange).toBeCalled();
    });
    expect(wrapper.instance().props.visible).toBe(false);

    div.simulate('click');
    setTimeout(() => {
      expect(onVisibleChange).toBeCalled();
    });
    expect(wrapper.instance().props.visible).toBe(false);
  });
});
