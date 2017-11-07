import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from '../index';
import enLocale from '../locale/en_US';


describe('DatePicker', () => {
  it('DatePicker year', () => {
    const wrapper = render(
      <DatePicker
        title="选择年份"
        placeholder="请选择年份"
        mode="year"
        value="2017"
        locale={enLocale}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePicker month', () => {
    const wrapper = render(
      <DatePicker
        title="选择年份"
        placeholder="请选择年份"
        mode="month"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePicker date', () => {
    const wrapper = mount(
      <DatePicker
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        value="2009-03-04"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2017-09-06' });
  });

  it('DatePicker time', () => {
    const wrapper = render(
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="time"
        minuteStep={15}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DatePicker datetime', () => {
    const wrapper = mount(
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2017-09-06 12:00' });
  });

  it('DatePicker datetime', () => {
    const wrapper = mount(
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        min="2017-11-02 11:00"
        max="2017-11-12 14:00"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2017-09-06 12:00' });
  });

  it('should trigger onOk when press ok button', () => {
    const onOkFn = jest.fn();
    const onCancelFn = jest.fn();

    const wrapper = mount(
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        onOk={onOkFn}
        onCancel={onCancelFn}
        onMaskClick={onCancelFn}
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
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        onOk={onOkFn}
        onCancel={onCancelFn}
        onMaskClick={onCancelFn}
        />
    );

    wrapper.find('.za-picker-cancel').simulate('click');
    expect(onCancelFn).toHaveBeenCalled();
    expect(onOkFn).not.toHaveBeenCalled();
  });

  it('should trigger maskClick when click mask', () => {
    const onClickFn = jest.fn();
    const onMaskClick = jest.fn();
    const onCancelFn = jest.fn();
    const wrapper = mount(
      <DatePicker
        title="选择时间"
        placeholder="请选择时间"
        mode="datetime"
        onClick={onClickFn}
        onCancel={onCancelFn}
        onMaskClick={onMaskClick}
        />
    );
    wrapper.find('.za-picker').simulate('click');
    expect(onClickFn).toHaveBeenCalled();
    wrapper.find('.za-mask').simulate('click');
    expect(onMaskClick).toHaveBeenCalled();
    expect(onCancelFn).toHaveBeenCalled();
  });
});
