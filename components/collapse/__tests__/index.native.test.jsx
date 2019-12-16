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
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual([]);
  });

  it('defaultActiveKey is array', () => {
    props.defaultActiveKey = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('defaultActiveKey is string', () => {
    props.defaultActiveKey = '0';
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('defaultActiveKey is number', () => {
    props.defaultActiveKey = 0;
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('activeKey is array', () => {
    props.activeKey = [0];
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('activeKey is string', () => {
    props.activeKey = '0';
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('activeKey is number', () => {
    props.activeKey = 0;
    const wrapper = shallow(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('multiple is false', () => {
    props.multiple = false;
    props.activeKey = [0, 1];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐" key={0}>
          <Text>50元套餐内容</Text>
        </Collapse.Item>
        <Collapse.Item title="100元套餐" key={1}>
          <Text>100元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    wrapper.find(TouchableHighlight).at(1).props().onPress();
    expect(wrapper.state('activeKey')).toEqual(['1']);
  });

  it('disabled is true', () => {
    props.disabled = true;
    const wrapper = mount(
      <Collapse>
        <Collapse.Item title="50元套餐" {...props}>
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    wrapper.find(TouchableHighlight).props().onPress();
    expect(wrapper.state('activeKey')).toEqual([]);
  });

  it('animated is true', () => {
    props.animated = true;
    props.activeKey = 0;
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐">
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    expect(wrapper.state('activeKey')).toEqual(['0']);
  });

  it('default onChange', () => {
    props.multiple = true;
    props.activeKey = [0];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐" key={0}>
          <Text>50元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    wrapper.find(TouchableHighlight).props().onPress();
    expect(wrapper.state('activeKey')).toEqual([]);
  });

  it('change props', () => {
    props.multiple = true;
    props.activeKey = [0];
    const wrapper = mount(
      <Collapse {...props}>
        <Collapse.Item title="50元套餐" key={0}>
          <Text>50元套餐内容</Text>
        </Collapse.Item>
        <Collapse.Item title="100元套餐" key={1}>
          <Text>100元套餐内容</Text>
        </Collapse.Item>
      </Collapse>,
    );
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    wrapper.setProps({
      activeKey: [1],
    });
    wrapper.setProps({
      activeKey: 1,
    });
    wrapper.find(TouchableHighlight).at(0).props().onPress();
    expect(wrapper.state('activeKey')).toEqual(['1', '0']);
  });
});
