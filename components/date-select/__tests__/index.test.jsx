import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DateSelect from '../index';
import enLocale from '../../date-picker-view/locale/en_US';

function fakeTimers() {
  performance.timing = {};
  performance.timing.navigationStart = 0;
}
fakeTimers();

describe('DateSelect', () => {
  it('DateSelect year', () => {
    const wrapper = mount(
      <DateSelect
        title="选择年份"
        placeholder="请选择年份"
        mode="year"
        value="2017"
        locale={enLocale}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect trigger visible', () => {
    const wrapper = mount(
      <DateSelect
        mode="date"
        defaultValue="2017-11-03"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect disabled', () => {
    const wrapper = mount(
      <DateSelect
        disabeld
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        value="2019-04-23"
      />,
    );

    wrapper.find('.za-date-select').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect date', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        value="2009-03-04"
      />,
    );
    wrapper.setProps({ value: '2017-09-06' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect time', () => {
    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="time"
        defaultValue="2017-11-03 15:00"
        minuteStep={15}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect datetime', () => {
    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        min="2017-11-02 11:00"
        max="2017-11-02 14:00"
        defaultValue="2017-11-03 15:00"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ defaultValue: '2017-11-06 12:00', value: '2017-11-06 12:00' });
  });

  it('DateSelect wheelDefaultValue', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        wheelDefaultValue="2017-11-03 15:00"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('should trigger onOk when press ok button', () => {
  //   const onOkFn = jest.fn();

  //   const wrapper = mount(
  //     <DateSelect
  //       mode="date"
  //       value="2009-3-4"
  //       onOk={onOkFn}
  //     />,
  //   );
  //   wrapper.find('.za-date-picker__submit').simulate('click');
  //   expect(onOkFn).toBeCalled();
  // });

  // it('should trigger onCancel when press cancel button', () => {
  //   const onCancelFn = jest.fn();

  //   const wrapper = mount(
  //     <DateSelect
  //       mode="date"
  //       value="2009-3-4"
  //       onCancel={onCancelFn}
  //     />,
  //   );

  //   wrapper.find('.za-date-picker__cancel').simulate('click');
  //   expect(onCancelFn).toBeCalled();
  // });

  // it('should trigger onMaskClick when click mask', () => {
  //   const onMaskClick = jest.fn();

  //   const wrapper = mount(
  //     <DateSelect
  //       mode="date"
  //       value="2009-3-4"
  //       visible
  //       onMaskClick={onMaskClick}
  //     />
  //   );

  //   wrapper.find('.za-mask').simulate('click');
  //   expect(onMaskClick).toBeCalled();
  // });
});
