import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';
import InputBase from '../InputBase';


describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength maxLength={100} type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <Input onFocus={onFocus} />
    );
    wrapper.find('input[type="text"]').simulate('focus');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onBlur called correctly', () => {
    const wrapper = mount(<InputBase />);
    const spy = jest.spyOn(wrapper.instance(), 'onBlur');
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    expect(spy).toHaveBeenCalled();
  });

  it('renders onClear called correctly', () => {
    const onClear = jest.fn();
    const wrapper = mount(
      <Input
        onClear={onClear}
        clearable
      />
    );

    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-input-clear').simulate('click');
    expect(onClear).toHaveBeenCalled();
    expect(input.instance().value).toEqual('');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoHeight', () => {
    jest.useFakeTimers();
    const props = {
      autoHeight: true,
      type: 'textarea',
      rows: 4,
      value: 'foo',
      onChange: jest.fn(),
    };
    const wrapper = mount(<Input {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target: { value: 'this is a test!' } });
    expect(props.onChange).toBeCalledWith('this is a test!');
    jest.runAllTimers();
    wrapper.unmount();
  });
});

describe('Input.Number', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Input type="number" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onClear called correctly', () => {
    const onClear = jest.fn();
    const wrapper = mount(
      <Input
        type="number"
        onClear={onClear}
        clearable
      />
    );

    const input = wrapper.find('input[type="hidden"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-input-clear').simulate('click');
    expect(onClear).toHaveBeenCalled();
    expect(input.instance().value).toEqual('');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

//   it('enter number', () => {
//     const onChange = jest.fn();
//     const wrapper = mount(<Input type="number" onChange={onChange} />);
//     wrapper.find('input').simulate('focus');
//     const keys = wrapper.find('.za-keyboard-keys');
//     keys.childAt(0).simulate('click');
//     expect(onChange).toBeCalledWith('1');
//     wrapper.unmount();
//   });
});

describe('Input.Price', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Input type="price" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Input.Idcard', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Input type="idcard" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
