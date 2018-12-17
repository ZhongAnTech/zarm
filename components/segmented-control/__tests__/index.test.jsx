import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import SegmentedControl from '../index';

describe('SegmentedControl', () => {
  it('renders default correctly', () => {
    const onChange = jest.fn();
    const wrapper = render(
      <SegmentedControl
        shape="round"
        items={['选项1', '选项2']}
        onChange={onChange}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders selectIndex correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SegmentedControl
        shape="round"
        selectIndex={1}
        items={['选项1', '选项2']}
        onChange={onChange}
      />
    );
    wrapper.find('div.active').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders call onChange correctly', () => {
    let wrapper = null;
    const onChange = jest.fn().mockImplementation((newSelectIndex) => {
      expect(newSelectIndex).toEqual(0);
    });
    wrapper = mount(
      <SegmentedControl
        shape="round"
        selectIndex={1}
        items={['选项1', '选项2']}
        onChange={onChange}
      />
    );
    // 点击已选中tab,不触发onChange
    wrapper.find('div.active').simulate('click');
    expect(onChange).not.toBeCalled();
    expect(wrapper.find('div.tab').at(0).hasClass('active')).toEqual(false);
    // 点击未选中的tab,触发onChange,并检测selectIndx值
    wrapper.find('div.tab').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders more items correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SegmentedControl
        shape="round"
        selectIndex={-1}
        items={['选项1', '选项2', '选项3', '选项4', '选项5']}
        onChange={onChange}
      />
    );
    expect(wrapper.find('.tab')).toHaveLength(4);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SegmentedControl
        shape="round"
        disabled
        selectIndex={1}
        items={['选项1', '选项2']}
        onChange={onChange}
      />
    );
    wrapper.find('div.tab').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders block correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SegmentedControl
        shape="round"
        block
        selectIndex={1}
        items={['选项1', '选项2']}
        onChange={onChange}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders default shape correctly', () => {
    const wrapper = mount(
      <SegmentedControl
        selectIndex={1}
        items={['选项1', '选项2']}
      />
    );
    wrapper.find('div.tab').at(0).simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
