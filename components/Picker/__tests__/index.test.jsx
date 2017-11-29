import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Picker from '../index';

const District = [{
  value: '340000',
  label: '安徽省',
  children: [{
    value: '340800',
    label: '安庆市',
    children: [{
      value: '340803',
      label: '大观区',
      children: [],
    }],
  }],
}, {
  value: '820000',
  label: '澳门特别行政区',
  children: [{
    value: '820100',
    label: '澳门半岛',
    children: [],
  }, {
    value: '820200',
    label: '离岛',
    children: [],
  }],
}, {
  value: '110000',
  label: '北京',
  children: [{
    value: '110100',
    label: '北京市',
    children: [{
      value: '110114',
      label: '昌平区',
      children: [],
    }, {
      value: '110105',
      label: '朝阳区',
      children: [],
    }, {
      value: '110103',
      label: '崇文区',
      children: [],
    }, {
      value: '110115',
      label: '大兴区',
      children: [],
    }, {
      value: '110101',
      label: '东城区',
      children: [],
    }, {
      value: '110111',
      label: '房山区',
      children: [],
    }, {
      value: '110106',
      label: '丰台区',
      children: [],
    }, {
      value: '110108',
      label: '海淀区',
      children: [],
    }, {
      value: '110116',
      label: '怀柔区',
      children: [],
    }, {
      value: '110109',
      label: '门头沟区',
      children: [],
    }, {
      value: '110228',
      label: '密云县',
      children: [],
    }, {
      value: '110117',
      label: '平谷区',
      children: [],
    }, {
      value: '110230',
      label: '其它区',
      children: [],
    }, {
      value: '110107',
      label: '石景山区',
      children: [],
    }, {
      value: '110113',
      label: '顺义区',
      children: [],
    }, {
      value: '110112',
      label: '通州区',
      children: [],
    }, {
      value: '110102',
      label: '西城区',
      children: [],
    }, {
      value: '110104',
      label: '宣武区',
      children: [],
    }, {
      value: '110229',
      label: '延庆县',
      children: [],
    }],
  }],
},
];


describe('Picker', () => {
  it('Picker render visible', () => {
    const wrapper = render(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        visible
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
        onOk={onOkFn}
        onCancel={onCancelFn}
        />
    );

    wrapper.find('.za-picker-submit').simulate('click');
    expect(onOkFn).toBeCalled();
    expect(onCancelFn).not.toBeCalled();
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
        onOk={onOkFn}
        onCancel={onCancelFn}
        />
    );

    wrapper.find('.za-picker-cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
    expect(onOkFn).not.toBeCalled();
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

  it('StackPicker init value', () => {
    const wrapper = mount(
      <Picker.Stack
        dataSource={District}
        value={['340000', '340800', '340803']}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('StackPicker changeValue', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(
      <Picker.Stack
        dataSource={District}
        displayRender={onChangeFn}
        />
    );

    wrapper.find('.za-picker-stack-column').at(0).simulate('click');
    wrapper.find('.za-picker-stack-item').at(0).simulate('click');
    expect(onChangeFn).toBeCalled();
  });

  it('StackPicker maskClick', () => {
    const wrapper = mount(
      <Picker.Stack
        dataSource={District}
        />
    );
    wrapper.find('.za-picker-input').simulate('click');
    wrapper.find('.za-picker-cancel').simulate('click');
    wrapper.find('.za-mask').simulate('click');
  });
});
