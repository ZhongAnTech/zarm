import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';
import InputBase from '../InputBase';
import InputTextarea from '../InputTextarea';

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly if type=text and props includes rows', () => {
    const wrapper = render(<Input type="text" rows={1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly if type isn\'t valid', () => {
    const wrapper = render(<Input type="xxx" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength maxLength={100} type="text" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('focus manual called correctly', () => {
    const onFocus = jest.fn();
    const id = String(Math.random());
    const wrapper = mount(<Input id={id} type="text" onFocus={onFocus} />);
    const instance = wrapper.instance();
    instance.focus();
    expect(wrapper.props().id).toEqual(id);
  });

  it('blur manual called correctly', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="number" onBlur={onBlur} />);
    const instance = wrapper.instance();
    instance.focus();
    instance.blur();
    expect(onBlur).toBeCalled();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(
      <Input onFocus={onFocus} />,
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
    const onChange = jest.fn();
    const wrapper = mount(
      <Input
        clearable
        value=""
        onClear={onClear}
        onChange={onChange}
      />,
    );

    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-input__clear').simulate('click');
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
  //   wrapper.find('i.za-input__clear').simulate('click');
  //   expect(input.instance().value).toEqual('');
  //   expect(onFocus).toHaveBeenCalled();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
});

describe('Input.Base', () => {
  it('auto focus', () => {
    const id = String(Math.random());
    const wrapper = mount(<InputBase id={id} autoFocus />);
    expect(wrapper.props().id).toEqual(id);
  });

  it('value update', () => {
    const wrapper = mount(<InputBase value={1} />);
    wrapper.setProps({ value: 2 });
    expect(wrapper.state('value')).toBe(2);
  });

  it('composition', () => {
    const onCompositionStart = jest.fn();
    const onCompositionUpdate = jest.fn();
    const onCompositionEnd = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <InputBase
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onCompositionEnd}
        onChange={onChange}
      />,
    );
    const input = wrapper.find('input');
    input.simulate('compositionstart');
    expect(onCompositionStart).toBeCalled();
    expect(wrapper.state('isOnComposition')).toBe(true);
    expect(onChange).not.toBeCalled();
    input.simulate('compositionupdate');
    expect(onCompositionUpdate).toBeCalled();
    expect(onChange).not.toBeCalled();
    expect(wrapper.state('isOnComposition')).toBe(true);
    input.simulate('compositionend');
    expect(onCompositionEnd).toBeCalled();
    expect(onChange).toBeCalled();
    expect(wrapper.state('isOnComposition')).toBe(false);
  });
});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoHeight', () => {
    jest.useFakeTimers();
    const props = {
      autoHeight: true,
      type: 'text',
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
      <Input type="text" rows={2} onFocus={onFocus} />,
    );
    wrapper.find('textarea').simulate('focus');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onBlur called correctly', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="text" rows={2} onBlur={onBlur} />);
    // const spy = jest.spyOn(wrapper.instance(), 'onBlur');
    wrapper.find('textarea').simulate('focus');
    wrapper.find('textarea').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('composition', () => {
    const onCompositionStart = jest.fn();
    const onCompositionUpdate = jest.fn();
    const onCompositionEnd = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <InputTextarea
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionUpdate}
        onCompositionEnd={onCompositionEnd}
        onChange={onChange}
      />,
    );
    const textarea = wrapper.find('textarea');
    textarea.simulate('compositionstart');
    expect(onCompositionStart).toBeCalled();
    // expect(wrapper.state('isOnComposition')).toBe(true);
    expect(onChange).not.toBeCalled();
    textarea.simulate('compositionupdate');
    expect(onCompositionUpdate).toBeCalled();
    expect(onChange).not.toBeCalled();
    // expect(wrapper.state('isOnComposition')).toBe(true);
    textarea.simulate('compositionend');
    expect(onCompositionEnd).toBeCalled();
    expect(onChange).toBeCalled();
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
      <Input type="number" onFocus={onFocus} />,
    );
    wrapper.find('.za-input__content').simulate('click');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onClear called correctly', () => {
    const onClear = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <Input
        clearable
        type="number"
        value=""
        onClear={onClear}
        onChange={onChange}
      />,
    );

    const input = wrapper.find('input[type="hidden"]');
    input.simulate('change', { target: { value: 'My new value' } });
    setTimeout(() => {
      wrapper.find('i.za-input__clear').simulate('click');
      expect(onClear).toHaveBeenCalled();
      expect(input.instance().value).toEqual('');
      expect(toJson(wrapper)).toMatchSnapshot();
    }, 3000);
  });

  it('enter number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Input type="number" focused onChange={onChange} />);
    wrapper.find('input').simulate('focus');
    const keys = wrapper.find('.za-keyboard__keys');
    keys.childAt(0).simulate('click');
    expect(onChange).toBeCalledWith('1');
    wrapper.unmount();
  });

  it('input number hidden', () => {
    const onBlur = jest.fn();
    const wrapper = mount(<Input type="number" focused onBlur={onBlur} />);
    wrapper.find('input').simulate('focus');
    const keys = wrapper.find('.za-keyboard__keys');
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
      target: document.body,
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
