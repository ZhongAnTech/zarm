import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Picker from '../index';

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

  it('Cascader Picker', () => {
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
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePicker', () => {
    const wrapper = render(
      <Picker.Date mode="date" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('StackPicker', () => {
    const wrapper = render(
      <Picker.Stack
        dataSource={[
          {
            value: '1',
            label: '北京市',
            children: [
              { value: '11', label: '海淀区' },
              { value: '12', label: '西城区' },
            ],
          },
          {
            value: '2',
            label: '上海市',
            children: [
              { value: '21', label: '黄埔区' },
              { value: '22', label: '虹口区' },
            ],
          },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new dataSourcea', () => {
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

  // it('onChange', () => {
  //   const onChange = jest.fn();
  //   const wrapper = shallow(
  //     <Picker
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //       onChange={onChange}
  //       />
  //   );
  //   wrapper.find('input').simulate('change', { target: { value: '2' } });
  //   expect(onChange).toBeCalledWith('2');
  // });
});
