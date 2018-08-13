// import 'jsdom-global/register';
import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { mount, shallow } from 'enzyme';
import Collapse from '../index.native';

describe('Collapse', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual([]);
  });

  it('defaultActiveIndex is array', () => {
    props.defaultActiveIndex = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('defaultActiveIndex is string', () => {
    props.defaultActiveIndex = '0';
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('defaultActiveIndex is number', () => {
    props.defaultActiveIndex = 0;
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('activeIndex is array', () => {
    props.activeIndex = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('activeIndex is string', () => {
    props.activeIndex = '0';
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('activeIndex is number', () => {
    props.activeIndex = 0;
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('multiple is false', () => {
    props.multiple = false;
    props.activeIndex = [0, 1];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <Text>100元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    wrapper.find(TouchableHighlight).at(1).props().onPress();
    expect(wrapper.state('activeIndex')).toEqual(['1']);
  });

  it('disabled is true', () => {
    props.disabled = true;
    const wrapper = mount(
      <Collapse>
        <Collapse.Item title="50元套餐" {...props}>
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find(TouchableHighlight).props().onPress();
    expect(wrapper.state('activeIndex')).toEqual([]);
  });

  it('animated is true', () => {
    props.animated = true;
    props.activeIndex = 0;
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    expect(wrapper.state('activeIndex')).toEqual(['0']);
  });

  it('default onChange', () => {
    props.multiple = true;
    props.activeIndex = [0];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find(TouchableHighlight).props().onPress();
    expect(wrapper.state('activeIndex')).toEqual([]);
  });

  it('change props', () => {
    props.multiple = true;
    props.activeIndex = [0];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
        <Collapse.Item title="100元套餐">
          <Text>100元套餐内容</Text>
        </Collapse.Item>
      </Collapse>
    );
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    wrapper.setProps({
      activeIndex: [1],
    });
    wrapper.setProps({
      activeIndex: 1,
    });
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    expect(wrapper.state('activeIndex')).toEqual(['1', '0']);
  });
});
