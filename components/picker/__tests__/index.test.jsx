import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Picker from '../index';

describe('Picker', () => {
  const fakeTimers = () => {
    performance.timing = {};
    performance.timing.navigationStart = 0;
  };
  fakeTimers();

  it('Picker render visible', () => {
    const wrapper = mount(
      <Picker
        prefixCls="za-picker"
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        visible
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render custom label', () => {
    const wrapper = mount(
      <Picker
        dataSource={[
          {
            code: '1',
            name: '北京市',
            children: [
              { code: '11', name: '海淀区' },
              { code: '12', name: '西城区' },
            ],
          },
          {
            code: '2',
            name: '上海市',
            children: [
              { code: '21', name: '黄埔区' },
              { code: '22', name: '虹口区' },
            ],
          },
        ]}
        valueMember="code"
        itemRender={(data) => data.name}
      />,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onOk when press ok button', () => {
    jest.useFakeTimers();
    const onOkFn = jest.fn();

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
        visible
        value={['1', '12']}
        onOk={onOkFn}
      />,
    );

    wrapper.find('.za-picker__submit').simulate('click');
    jest.runAllTimers();
    expect(onOkFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
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
        visible
        defaultValue={['1', '12']}
        onCancel={onCancelFn}
      />,
    );

    wrapper.find('.za-picker__cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
  });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onOkFn = jest.fn();
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <Picker
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
  //     />, { attachTo: window.domNode }
  //   );

  //   wrapper.find('.za-mask').simulate('click');
  //   expect(onMaskClick).toBeCalled();
  // });

  it('receive new dataSource', () => {
    const wrapper = shallow(
      <Picker
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
      <Picker
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

  // it('StackPicker', () => {
  //   jest.useFakeTimers();
  //   const wrapper = mount(
  //     <Picker.Stack
  //       dataSource={District}
  //       />
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   wrapper.setProps({ value: ['安徽省', '安庆市', '大观区'] });
  //   jest.runAllTimers();
  //   wrapper.unmount();
  // });

  // it('StackPicker init value', () => {
  //   const wrapper = mount(
  //     <Picker.Stack
  //       dataSource={District}
  //       value={['340000', '340800', '340803']}
  //       />
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('StackPicker changeValue', () => {
  //   const onChangeFn = jest.fn();
  //   const wrapper = mount(
  //     <Picker.Stack
  //       dataSource={District}
  //       onOk={onChangeFn}
  //       />
  //   );

  //   wrapper.find('.za-picker-stack-column').at(0).simulate('click');
  //   wrapper.find('.za-picker-stack-item').at(0).simulate('click');
  //   expect(onChangeFn).toBeCalled();
  // });

  // it('StackPicker maskClick', () => {
  //   const wrapper = mount(
  //     <Picker.Stack
  //       dataSource={District}
  //       />
  //   );
  //   wrapper.find('.za-picker-input').simulate('click');
  //   wrapper.find('.za-picker-cancel').simulate('click');
  //   wrapper.find('.za-mask').simulate('click');
  // });
});
