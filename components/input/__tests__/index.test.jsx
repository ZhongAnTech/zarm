import React from 'react';
import { findDOMNode } from 'react-dom';
import { render, mount } from 'enzyme';
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
        value=""
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

  // it('renders cn', () => {
  //   const onFocus = jest.fn();
  //   const wrapper = mount(
  //     <Input
  //       value=""
  //       onFocus={onFocus}
  //     />
  //   );

  //   const input = wrapper.find('input[type="text"]');
  //   input.simulate('change', { target: { value: '测试' } });
  //   wrapper.find('i.za-input-clear').simulate('click');
  //   expect(input.instance().value).toEqual('');
  //   expect(onFocus).toHaveBeenCalled();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
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

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <Input type="textarea" onFocus={onFocus} />
    );
    wrapper.find('textarea').simulate('focus');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onBlur called correctly', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="textarea" onBlur={onBlur} />);
    // const spy = jest.spyOn(wrapper.instance(), 'onBlur');
    wrapper.find('textarea').simulate('focus');
    wrapper.find('textarea').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });
});

describe('Input.Number', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Input type="number" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <Input type="number" onFocus={onFocus} />
    );
    wrapper.find('.za-input-content').simulate('click');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onClear called correctly', () => {
    const onClear = jest.fn();
    const wrapper = mount(
      <Input
        type="number"
        onClear={onClear}
      />
    );

    const input = wrapper.find('input[type="hidden"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-input-clear').simulate('click');
    expect(onClear).toHaveBeenCalled();
    expect(input.instance().value).toEqual('');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('enter number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Input type="number" focused onChange={onChange} />);
    wrapper.find('input').simulate('focus');
    const keys = wrapper.find('.za-keyboard-keys');
    keys.childAt(0).simulate('click');
    expect(onChange).toBeCalledWith('1');
    wrapper.unmount();
  });

  it('input number hidden', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="number" focused onBlur={onBlur} />);
    wrapper.find('input').simulate('focus');
    const keys = wrapper.find('.za-keyboard-keys');
    keys.childAt(11).simulate('click');
    expect(onBlur).toBeCalled();
    wrapper.unmount();
  });

  it('input number hidden', () => {
    const map = {};
    document.body.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="number" focused onBlur={onBlur} />);
    map.click({
      target: findDOMNode(document.body), // eslint-disable-line
    });
    expect(onBlur).toBeCalled();
    wrapper.unmount();
  });
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
