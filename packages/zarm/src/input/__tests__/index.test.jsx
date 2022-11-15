import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Input from '../index';

describe('Input', () => {
  it('renders correctly', () => {
    const { container } = render(<Input type="text" />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly if type=text and props includes rows', () => {
    const { container } = render(<Input type="text" rows={1} />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly if type isn't valid", () => {
    const { container } = render(<Input type="xxx" />);
    expect(container).toMatchSnapshot();
  });

  it('showLength', () => {
    const { container } = render(<Input showLength maxLength={100} type="text" rows={4} />);
    expect(container).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const { container } = render(<Input onFocus={onFocus} />);
    const input = container.querySelector('input');
    fireEvent.focus(input);
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    // wrapper.unmount();
  });

  it('renders onClear called correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<Input clearable value="" onChange={onChange} />);

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'My new value' } });
    const clearBtn = container.querySelector('.za-input__clear');
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalled();
    expect(input.value).toEqual('');
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
    const { container } = render(<Input className="text-input" autoFocus />);
    const input = container.querySelectorAll('.text-input');
    expect(input.length).toBe(1);
  });
});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" rows={4} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const { container } = render(<Input type="text" rows={2} onFocus={onFocus} />);
    const textarea = container.querySelector('textarea');
    fireEvent.focus(textarea);
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    //  wrapper.unmount();
  });
});
