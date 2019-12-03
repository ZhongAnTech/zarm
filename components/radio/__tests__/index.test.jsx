import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Radio from '../index';

describe('Radio', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Radio value="0">选项一</Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(
      <Radio defaultChecked value="0">选项一</Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is button', () => {
    const wrapper = render(
      <Radio type="button" value="0">选项一</Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is cell', () => {
    const wrapper = render(
      <Radio type="cell" value="0">选项一</Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new checked', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>选项一</Radio>,
    );
    wrapper.setProps({ checked: true });
    wrapper.find('input[type="radio"]').simulate('change');
    expect(onChange).toBeCalled();
  });

  it('disabled', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>选项一</Radio>,
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
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    wrapper.setProps({ value: '1' });
  });

  it('defaultValue', () => {
    const wrapper = render(
      <Radio.Group defaultValue="1">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Radio checked', () => {
    const wrapper = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1" checked>选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // 圆角
  it('shape is radius', () => {
    const wrapper = shallow(
      <Radio.Group shape="radius">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--radius')).toBe(true);
  });

  // 椭圆角
  it('shape is round', () => {
    const wrapper = shallow(
      <Radio.Group shape="round">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--round')).toBe(true);
  });

  // 块级样式
  it('block', () => {
    const wrapper = shallow(
      <Radio.Group block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--block')).toBe(true);
  });

  // 列表样式
  it('type is cell', () => {
    const wrapper = shallow(
      <Radio.Group type="cell">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--cell')).toBe(true);
  });

  it('radio group onChange event', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio.Group shape="round" onChange={onChange}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>选项三</Radio>
      </Radio.Group>,
    );
    const firstCheckbox = wrapper.find(Radio).first().dive().find('input[type="radio"]');
    firstCheckbox.simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith('0');
  });
});
