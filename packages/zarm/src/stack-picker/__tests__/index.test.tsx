import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import StackPicker from '../index';

jest.useFakeTimers();

const District = [
  {
    value: '340000',
    label: '安徽省',
    children: [
      {
        value: '340800',
        label: '安庆市',
        children: [
          {
            value: '340803',
            label: '大观区',
            children: [],
          },
          {
            value: '340822',
            label: '怀宁县',
            children: [],
          },
          {
            value: '340882',
            label: '其它区',
            children: [],
          },
        ],
      },
    ],
  },
  {
    value: '310000',
    label: '上海',
    children: [
      {
        value: '310100',
        label: '上海市',
        children: [
          {
            value: '310113',
            label: '宝山区',
            children: [],
          },
          {
            value: '310105',
            label: '长宁区',
            children: [],
          },
          {
            value: '310230',
            label: '崇明县',
            children: [],
          },
          {
            value: '310152',
            label: '川沙区',
            children: [],
          },
        ],
      },
    ],
  },
];

describe('StackPicker', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        okText="确定"
        visible
        valueMember="value"
        itemRender={(data) => data.label}
        dataSource={District}
        onChange={onChange}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handle props click', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <StackPicker
        defaultValue={[]}
        cancelText="取消"
        okText="确定"
        maskClosable
        value={['340000', '340800', '340803']}
        dataSource={District}
        onCancel={onCancel}
        onOk={onOk}
      />,
    );

    wrapper.setProps({ visible: true });
    wrapper.update();

    wrapper.find('.za-stack-picker__submit').simulate('click');
    expect(onOk).toHaveBeenCalledWith(['340000', '340800', '340803']);

    wrapper.find('.za-stack-picker__cancel').simulate('click');
    expect(onCancel).toBeCalled();

    wrapper.find('.za-mask').simulate('click');
    expect(onCancel).toBeCalled();
  });

  it('handle onChange', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        okText="确定"
        visible
        dataSource={District}
        onChange={onChange}
      />,
    );

    // popupWrapper = mount(wrapper.instance().getComponent());

    wrapper
      .find('.za-stack-picker__group')
      .at(0)
      .find('.za-stack-picker__stack-column')
      .at(0)
      .simulate('click');

    wrapper
      .find('.za-stack-picker__group')
      .at(0)
      .find('.za-stack-picker__stack-column-wrapper')
      .at(0)
      .simulate('click');

    wrapper
      .find('.za-stack-picker__group')
      .at(0)
      .find('.za-stack-picker__stack-column-wrapper')
      .at(0)
      .find('.za-stack-picker__stack-column-item')
      .at(0)
      .simulate('click');

    expect(onChange).toHaveBeenCalledWith(['340000']);
  });

  it('handle onChangeValidate', () => {
    const onChange = jest.fn();
    const onChangeValidate = jest.fn(() => 'error');

    const wrapper = mount(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        okText="确定"
        visible
        dataSource={District}
        onChange={onChange}
        onChangeValidate={onChangeValidate}
      />,
    );

    // popupWrapper = mount(wrapper.instance().getComponent());

    wrapper
      .find('.za-stack-picker__group')
      .at(0)
      .find('.za-stack-picker__stack-column-wrapper')
      .at(0)
      .find('.za-stack-picker__stack-column-item')
      .at(0)
      .simulate('click');

    // 目前不能取到 useState 的值
    expect(onChange).toHaveBeenCalledWith(['340000']);
  });
});

// describe('StackPicker props disabled', () => {
//   let wrapper;
//   const setState = jest.fn();
//   const useStateSpy = jest.spyOn(React, 'useState');
//   useStateSpy.mockImplementation((init) => [init, setState]);
//
//   const onCancel = jest.fn();
//   const onOk = jest.fn();
//
//   beforeEach(() => {
//     wrapper = shallow(
//       <StackPicker
//         visible
//         disabled
//         dataSource={District}
//         onCancel={onCancel}
//         onOk={onOk}
//       />,
//     );
//   });
//
//   it('handle props disabled', () => {
//     wrapper.find('.za-stack-picker__cancel').simulate('click');
//     // 目前不能取到 useState 的值
//     expect(onCancel).toBeCalled();
//   });
// });

describe('StackPicker error type', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('handle props error type', () => {
    const onCancel = 1 as any;
    const onOk = 1 as any;
    const displayRender = 1 as any;
    const onChangeValidate = 1 as any;
    const onChange = 1 as any;

    const wrapper = mount(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        okText="确定"
        dataSource={District}
        onCancel={onCancel}
        onOk={onOk}
        displayRender={displayRender}
        onChange={onChange}
        onChangeValidate={onChangeValidate}
      />,
    );

    wrapper.setProps({ visible: true });
    wrapper.update();

    expect(consoleSpy).toHaveBeenCalledWith('displayRender need a function');

    wrapper.find('.za-stack-picker__cancel').simulate('click');
    expect(consoleSpy).toHaveBeenCalledWith('onCancel need a function');

    wrapper.find('.za-stack-picker__submit').simulate('click');
    expect(consoleSpy).toHaveBeenCalledWith('onOk need a function');

    wrapper
      .find('.za-stack-picker__group')
      .at(0)
      .find('.za-stack-picker__stack-column-wrapper')
      .at(0)
      .find('.za-stack-picker__stack-column-item')
      .at(0)
      .simulate('click');
    expect(consoleSpy).toHaveBeenCalledWith('onChangeValidate need a function');
    expect(consoleSpy).toHaveBeenCalledWith('onChange need a function');

    consoleSpy.mockRestore();
  });
});
