import React, { ChangeEvent } from 'react';
import { render, mount, shallow } from 'enzyme';
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

  it('type is cell', () => {
    const wrapper = render(
      <Radio type="cell" value="0">
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
  describe('#getDerivedStateFromProps', () => {
    it('should get derived state from props correctly', () => {
      const props = { value: 1 };
      const state = RadioGroup.getDerivedStateFromProps(props);
      expect(state).toEqual({ value: 1 });
    });
    it('should return null if  value field not in props', () => {
      const props = {};
      const state = RadioGroup.getDerivedStateFromProps(props);
      expect(state).toBeNull();
    });
  });

  describe('#getValue', () => {
    it('should get initial state from props correctly if props has value field', () => {
      const wrapper = shallow(<RadioGroup value={1} />);
      expect(wrapper.state()).toEqual({ value: 1 });
    });
    it('should get initial state from props correctly if props has defaultValue field', () => {
      const wrapper = shallow(<RadioGroup defaultValue={1} />);
      expect(wrapper.state()).toEqual({ value: 1 });
    });

    it('should get null', () => {
      const wrapper = shallow(<RadioGroup />);
      expect(wrapper.state()).toEqual({ value: null });
    });
  });

  describe('#getChildChecked', () => {
    it('should get initial state from props correctly if component has single child', () => {
      const wrapper = shallow(
        <RadioGroup>
          <TestRadio checked value={233} />
        </RadioGroup>,
      );
      expect(wrapper.state()).toEqual({ value: 233 });
    });

    it('should get initial state from props correctly if component has children', () => {
      const wrapper = shallow(
        <RadioGroup>
          <TestRadio checked value={233} />
          <TestRadio checked value={222} />
        </RadioGroup>,
      );
      expect(wrapper.state()).toEqual({ value: 222 });
    });

    it('should get initial state from props correctly if component has invalid React element child', () => {
      const wrapper = shallow(
        <RadioGroup>
          <TestRadio checked={false} value={110} />
        </RadioGroup>,
      );
      expect(wrapper.state()).toEqual({ value: null });
    });
  });

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
      shape: 'radius',
      disabled: false,
      onChange: expect.any(Function),
    });
    expect(wrapper.find(TestRadio).at(1).props()).toEqual({
      value: 2,
      checked: false,
      type: 'button',
      shape: 'radius',
      disabled: false,
      onChange: expect.any(Function),
    });
  });

  it('should handle onChange event on radio group component', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <RadioGroup id="test-radio-group" onChange={onChange}>
        <TestRadio value={1} checked={false} />
        <TestRadio value={2} checked={false} />
      </RadioGroup>,
    );
    expect(wrapper.state('value')).toBeNull();
    const input = wrapper.find('.za-radio-group__inner').children().at(0).find('input');
    expect(input.props()).toEqual(
      expect.objectContaining({
        value: 1,
        checked: false,
        type: undefined,
        shape: 'radius',
        disabled: false,
        onChange: expect.any(Function),
      }),
    );
    input.simulate('change');
    expect(onChange).toBeCalledWith(1);
    expect(wrapper.state('value')).toEqual(1);
  });

  it('should handle onChange event on the children', () => {
    const onChange1 = jest.fn();
    const onChange2 = jest.fn();
    const wrapper = mount(
      <RadioGroup id="test-radio-group">
        <TestRadio value={1} checked={false} onChange={onChange1} />
        <TestRadio value={2} checked={false} onChange={onChange2} />
      </RadioGroup>,
    );
    expect(wrapper.state('value')).toBeNull();
    const input = wrapper.find('.za-radio-group__inner').children().at(0).find('input');
    expect(input.props()).toEqual({
      value: 1,
      checked: false,
      type: undefined,
      shape: 'radius',
      disabled: false,
      onChange: expect.any(Function),
    });
    input.simulate('change');
    expect(onChange1).toBeCalledTimes(1);
    expect(onChange2).not.toBeCalled();
    expect(wrapper.state('value')).toEqual(1);
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
  it('shape is radius', () => {
    const wrapper = shallow(
      <Radio.Group shape="radius">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--radius')).toBe(true);
  });

  // 椭圆角
  it('shape is round', () => {
    const wrapper = shallow(
      <Radio.Group shape="round">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2">选项三</Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--round')).toBe(true);
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
  it('type is cell', () => {
    const wrapper = shallow(
      <Radio.Group type="cell">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三
        </Radio>
      </Radio.Group>,
    );
    expect(wrapper.find('.za-radio-group').hasClass('za-radio-group--cell')).toBe(true);
  });

  it('radio group onChange event', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Radio.Group shape="round" onChange={onChange}>
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
