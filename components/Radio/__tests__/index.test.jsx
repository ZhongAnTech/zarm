import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Radio from '../index';

describe('Radio', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Radio value="0">选项一</Radio>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is cell', () => {
    const wrapper = shallow(
      <Radio type="cell" value="0">选项一</Radio>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ checked: true });
  });

  it('checked change true', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>选项一</Radio>
    );
    wrapper.setProps({ checked: true });
    wrapper.find('input[type="radio"]').simulate('change');
    expect(onChange).toBeCalled();
  });

  it('disabled', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>选项一</Radio>
    );
    wrapper.setProps({ disabled: true });
    wrapper.find('input[type="radio"]').simulate('change');
  });
});

describe('Radio.Group', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    wrapper.setProps({ value: '1' });
  });

  it('receive new radio checked', () => {
    const wrapper = mount(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    wrapper.find('input[type="radio"][value="1"]').simulate('change', { target: { checked: true } });
  });

  it('defaultValue', () => {
    const wrapper = render(
      <Radio.Group defaultValue="1">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Radio checked', () => {
    const wrapper = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1" checked>选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // 指定默认值
  it('disabled', () => {
    const wrapper = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.find('input[type="radio"][value="2"]').prop('disabled')).toBe(true);
  });

  // 圆角
  it('shape is radius', () => {
    const wrapper = shallow(
      <Radio.Group shape="radius">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.hasClass('shape-radius')).toBe(true);
  });

  // 椭圆角
  it('shape is round', () => {
    const wrapper = shallow(
      <Radio.Group shape="round">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.hasClass('shape-round')).toBe(true);
  });

  // 块级样式
  it('block', () => {
    const wrapper = shallow(
      <Radio.Group block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>
    );
    expect(wrapper.hasClass('block')).toBe(true);
  });

  // 列表样式
  it('type is cell', () => {
    const wrapper = shallow(
      <Radio.Group type="cell">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>选项三</Radio>
      </Radio.Group>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.props().children[0].props.type).toEqual('cell');
  });
});
