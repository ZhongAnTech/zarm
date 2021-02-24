import { mount, shallow } from 'enzyme';
import React, { ChangeEvent } from 'react';
import RadioGroup from '../RadioGroup';

class TestRadio extends React.Component<{
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}> {
  render() {
    return <input {...this.props} />;
  }
}

describe('radio', () => {
  describe('RadioGroup', () => {
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
  });
});
