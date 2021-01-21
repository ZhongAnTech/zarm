import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from '../index';

describe('Select', () => {
  const fakeTimers = () => {
    performance.timing = () => {};
  };
  fakeTimers();

  it('Select', () => {
    const wrapper = mount(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Select disabled', () => {
    const wrapper = mount(
      <Select
        disabeld
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );

    wrapper.find('.za-select').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render defaultValue correctly ', () => {
    const wrapper = mount(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="2"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Cascader Select', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Select
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
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: ['1', '12'] });
    // jest.runAllTimers();
    wrapper.unmount();
  });

  it('Cascader Select init value', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Select
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
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new dataSource', () => {
    const wrapper = shallow(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
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
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    wrapper.setProps({ value: '1' });
  });

  it('receive new cascader dataSource', () => {
    const wrapper = shallow(
      <Select
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
      />,
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

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <Select
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
        onOk={onOkFn}
        onCancel={onCancelFn}
      />,
    );

    wrapper.find('.za-select').simulate('click');
    jest.useFakeTimers();
    wrapper.find('.za-picker__submit').simulate('click');
    jest.runAllTimers();
    expect(onOkFn).toBeCalled();
    expect(onCancelFn).not.toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <Select
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
        defaultValue={['1', '12']}
        onOk={onOkFn}
        onCancel={onCancelFn}
      />,
    );
    wrapper.find('.za-select').simulate('click');
    jest.useFakeTimers();
    wrapper.find('.za-picker__cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
    expect(onOkFn).not.toBeCalled();
  });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onOkFn = jest.fn();
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <Select
  //       dataSource={[
  //         {
  //           value: '1',
  //           label: '选项一',
  //           children: [
  //             { value: '11', label: '选项一' },
  //             { value: '12', label: '选项二' },
  //           ],
  //         },
  //         {
  //           value: '2',
  //           label: '选项一',
  //           children: [
  //             { value: '21', label: '选项一' },
  //             { value: '22', label: '选项二' },
  //           ],
  //         },
  //       ]}
  //       visible
  //       defaultValue={['1', '12']}
  //       onOk={onOkFn}
  //       onMaskClick={onMaskClick}
  //     />
  //   );

  //   wrapper.find('.za-mask').simulate('click');
  //   expect(onMaskClick).toBeCalled();
  // });
});
