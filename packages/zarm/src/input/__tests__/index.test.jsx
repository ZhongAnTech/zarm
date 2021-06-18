import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly if type=text and props includes rows', () => {
    const wrapper = render(<Input type="text" rows={1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders correctly if type isn't valid", () => {
    const wrapper = render(<Input type="xxx" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength maxLength={100} type="text" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(<Input onFocus={onFocus} />);
    wrapper.find('input[type="text"]').simulate('focus');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders onClear called correctly', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Input clearable value="" onChange={onChange} />);

    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.find('i.za-input__clear').simulate('click');
    expect(onChange).toHaveBeenCalled();
    expect(input.instance().value).toEqual('');
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
    const wrapper = mount(<Input id={id} autoFocus />);
    expect(wrapper.props().id).toEqual(id);
  });
});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const wrapper = mount(<Input type="text" rows={2} onFocus={onFocus} />);
    wrapper.find('textarea').simulate('focus');
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
