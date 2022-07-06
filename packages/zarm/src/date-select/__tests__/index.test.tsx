import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DateSelect from '../index';
import enLocale from '../../date-picker-view/locale/en_US';
import { date1, date2, date3, date4, date5, date6 } from '../../../tests/testData/date';

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
    const wrapper = mount(<DateSelect mode="date" defaultValue={date1} />);
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
        value={date1}
      />,
    );

    wrapper.find('.za-date-select').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect date', () => {
    const wrapper = mount(
      <DateSelect title="选择日期" placeholder="请选择日期" mode="date" value={date1} />,
    );
    wrapper.setProps({ value: date1 });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('DateSelect time', () => {
    const wrapper = mount(
      <DateSelect
        title="选择时间"
        placeholder="请选择时间"
        mode="time"
        defaultValue={date2}
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
        min={date3}
        max={date4}
        defaultValue={date5}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ defaultValue: date6, value: date6 });
  });

  it('DateSelect wheelDefaultValue', () => {
    const wrapper = mount(
      <DateSelect
        title="选择日期"
        placeholder="请选择日期"
        mode="date"
        wheelDefaultValue={date5}
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
