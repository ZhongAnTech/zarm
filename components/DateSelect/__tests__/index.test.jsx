import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment-timezone';
import DateSelect from '../index';
import enLocale from '../../DatePicker/locale/en_US';

describe('DateSelect', () => {
  moment.tz.setDefault('Asia/Shanghai');
  it('DateSelect year', () => {
    const wrapper = mount(
      <DateSelect
        title="选择年份"
        placeholder="请选择年份"
        mode="year"
        value={moment('2017')}
        locale={enLocale}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect trigger visible', () => {
    const wrapper = mount(
      <DateSelect
        mode="date"
        defaultValue={moment('2017-11-03')}
        visible
        />
      );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect month', () => {
    const wrapper = mount(
      <DateSelect
        title="选择年份"
        placeholder="请选择年份"
        defaultValue={moment('2017')}
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
        value={moment('2009-03-04')}
        />
    );
    wrapper.setProps({ value: moment('2017-09-06') });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect time', () => {
    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="time"
        defaultValue={moment('2017-11-03 15:00')}
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
        min={moment('2017-11-02 11:00')}
        max={moment('2017-11-12 14:00')}
        defaultValue={moment('2017-11-03 15:00')}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.useFakeTimers();
    wrapper.setProps({ defaultValue: moment('2017-11-06 12:00'), value: moment('2017-11-06 12:00') });
    jest.runAllTimers();
  });

  it('DateSelect wheelDefaultValue', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        visible
        wheelDefaultValue={moment('2017-11-03 15:00')}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        defaultValue={moment('2017-11-12 20:00')}
        onOk={onOkFn}
        onCancel={onCancelFn}
        onMaskClick={onCancelFn}
        />
    );

    // wrapper.find('.za-picker-submit').simulate('click');
    // expect(onOkFn).toBeCalled();
    // expect(onCancelFn).not.toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        onOk={onOkFn}
        onCancel={onCancelFn}
        onMaskClick={onCancelFn}
        defaultValue={moment('2017-11-12 20:00')}
        />
    );

    // wrapper.find('.za-picker-cancel').simulate('click');
    // expect(onCancelFn).toBeCalled();
    // expect(onOkFn).not.toBeCalled();
  });
});
