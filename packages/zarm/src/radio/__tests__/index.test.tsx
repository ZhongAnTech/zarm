import React, { ChangeEvent } from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RadioGroup from '../RadioGroup';
import Radio from '../index';

class TestRadio extends React.Component<{
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}> {
  render() {
    return <input {...this.props} />;
  }
}

describe('Radio', () => {
  it('renders correctly', () => {
    const wrapper = render(<Radio value="0">选项一</Radio>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(
      <Radio defaultChecked value="0">
        选项一
      </Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is button', () => {
    const wrapper = render(
      <Radio type="button" value="0">
        选项一
      </Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is list', () => {
    const wrapper = render(
      <Radio type="list" value="0">
        选项一
      </Radio>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new checked', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>
        选项一
      </Radio>,
    );
    wrapper.setProps({ checked: true });
    wrapper.find('input[type="radio"]').simulate('change');
    expect(onChange).toBeCalled();
  });

  it('disabled', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio value="0" onChange={onChange}>
        选项一
      </Radio>,
    );
    wrapper.setProps({ disabled: true });
    wrapper.find('input[type="radio"]').simulate('change');
  });
});

describe('Radio.Group', () => {
  it('should render with children', () => {
    const wrapper = shallow(
      <RadioGroup id="test-radio-group">
        <TestRadio value={1} checked={false} />
        <TestRadio value={2} checked={false} />
      </RadioGroup>,
    );
    expect(wrapper.find('.za-radio-group__inner').children()).toHaveLength(2);
    expect(wrapper.prop('id')).toEqual('test-radio-group');
  });

  it('should render with cloned react element correctly', () => {
    const wrapper = shallow(
      <RadioGroup id="test-radio-group" type="button">
        <TestRadio value={1} />
        <TestRadio value={2} />
      </RadioGroup>,
    );
    expect(wrapper.find(TestRadio).at(0).props()).toEqual({
      value: 1,
      checked: false,
      type: 'button',
      listMarkerAlign: 'before',
      disabled: false,
      onChange: expect.any(Function),
    });
    expect(wrapper.find(TestRadio).at(1).props()).toEqual({
      value: 2,
      checked: false,
      type: 'button',
      listMarkerAlign: 'before',
      disabled: false,
      onChange: expect.any(Function),
    });
  });

  it('renders correctly', () => {
    const wrapper = render(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Radio.Group value="0" onChange={jest.fn()}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    wrapper.setProps({ value: '1' });
  });

  it('defaultValue', () => {
    const wrapper = render(
      <Radio.Group defaultValue="1">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Radio checked', () => {
    const wrapper = render(
      <Radio.Group>
        <Radio value="0">选项一</Radio>
        <Radio value="1" checked>
          选项二
        </Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // 圆角
  it('buttonShape is radius', () => {
    const wrapper = shallow(
      <Radio.Group buttonShape="radius">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--button-radius')).toBe(true);
  });

  // 椭圆角
  it('buttonShape is round', () => {
    const wrapper = shallow(
      <Radio.Group buttonShape="round">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--button-round')).toBe(true);
  });

  // 块级样式
  it('block', () => {
    const wrapper = shallow(
      <Radio.Group block>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--block')).toBe(true);
  });

  // 列表样式
  it('type is list', () => {
    const wrapper = shallow(
      <Radio.Group type="list">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--list')).toBe(true);
  });

  it('radio group onChange event', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio.Group buttonShape="round" onChange={onChange}>
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    const firstCheckbox = wrapper.find(Radio).first().dive().find('input[type="radio"]');
    firstCheckbox.simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith('0');
  });
});
