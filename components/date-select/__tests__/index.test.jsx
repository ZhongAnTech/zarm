import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DateSelect from '../index';
import enLocale from '../../date-picker-view/locale/en_US';

describe('DateSelect', () => {
  it('DateSelect year', () => {
    const wrapper = mount(
      <DateSelect
        title="选择年份"
        placeholder="请选择年份"
        mode="year"
        value="2017"
        locale={enLocale}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect trigger visible', () => {
    const wrapper = mount(
      <DateSelect
        mode="date"
        defaultValue="2017-11-03"
        visible
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect date', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        value="2009-03-04"
      />
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
      />
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
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.useFakeTimers();
    wrapper.setProps({ defaultValue: '2017-11-06 12:00', value: '2017-11-06 12:00' });
    jest.runAllTimers();
  });

  it('DateSelect wheelDefaultValue', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        visible
        wheelDefaultValue="2017-11-03 15:00"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();

    const wrapper = mount(
      <DateSelect
        mode="date"
        value="2009-3-4"
        visible
        onOk={onOkFn}
      />
    );

    wrapper.find('.za-picker-submit').simulate('click');
    expect(onOkFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DateSelect
        mode="date"
        value="2009-3-4"
        visible
        onCancel={onCancelFn}
      />
    );

    wrapper.find('.za-picker-cancel').simulate('click');
    expect(onCancelFn).toBeCalled();
    expect(onOkFn).not.toBeCalled();
  });

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
