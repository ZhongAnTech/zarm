import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Picker from '../index';
import District from '../../../examples/pages/district';

describe('Picker', () => {
  it('Picker', () => {
    const wrapper = render(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render defaultValue correctly ', () => {
    const wrapper = render(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="2"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Cascader Picker', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: ['1', '12'] });
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('Cascader Picker init value', () => {
    jest.useFakeTimers();
    const wrapper = render(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        displayAddon="-"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        displayAddon="-"
        onOk={onOkFn}
        onCancel={onCancelFn}
        />
    );

    wrapper.find('.za-picker-submit').simulate('click');
    expect(onOkFn).toHaveBeenCalled();
    expect(onCancelFn).not.toHaveBeenCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        displayAddon="-"
        onOk={onOkFn}
        onCancel={onCancelFn}
        />
    );

    wrapper.find('.za-picker-cancel').simulate('click');
    expect(onCancelFn).toHaveBeenCalled();
    expect(onOkFn).not.toHaveBeenCalled();
  });

  it('receive new dataSource', () => {
    const wrapper = shallow(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    wrapper.setProps({
      dataSource: [
        { value: 'a', label: '选项一' },
        { value: 'b', label: '选项二' },
        { value: 'c', label: '选项三' },
      ],
    });
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    wrapper.setProps({ value: '1' });
  });

  it('receive new cascader dataSource', () => {
    const wrapper = shallow(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        />
    );

    wrapper.setProps({
      dataSource: [
        {
          value: '3',
          label: '选项一',
          children: [
            { value: '31', label: '选项一' },
            { value: '32', label: '选项二' },
          ],
        },
        {
          value: '4',
          label: '选项一',
          children: [
            { value: '41', label: '选项一' },
            { value: '42', label: '选项二' },
          ],
        },
      ],
    });
  });

  it('should trigger maskClick when click mask', () => {
    const handleClickFn = jest.fn();
    const onMaskClick = jest.fn();
    const onCancelFn = jest.fn();
    const wrapper = mount(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        onClick={handleClickFn}
        onCancel={onCancelFn}
        onMaskClick={onMaskClick}
        />
    );
    wrapper.find('.za-picker').simulate('click');
    expect(handleClickFn).toHaveBeenCalled();
    wrapper.find('.za-mask').simulate('click');
    expect(onMaskClick).toHaveBeenCalled();
    expect(onCancelFn).toHaveBeenCalled();
  });

  it('StackPicker', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Picker.Stack
        dataSource={District}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: ['安徽省', '安庆市', '大观区'] });
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('StackPicker', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Picker.Stack
        dataSource={District}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: ['安徽省', '安庆市', '大观区'] });
    jest.runAllTimers();
    wrapper.unmount();
  });
});
