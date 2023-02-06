import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CustomInput from '../index';

describe('CustomInput', () => {
  it('renders correctly', () => {
    const wrapper = render(<CustomInput type="number" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders readonly', () => {
    const wrapper = render(<CustomInput type="number" readOnly />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('auto focus', () => {
    const { container } = render(<CustomInput autoFocus className="custom-input" />);
    const input = container.getElementsByClassName('za-custom-input--focus');
    expect(input).toHaveLength(1);
  });

  it('show clear', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CustomInput clearable className="custom-input" value="test" onChange={onChange} autoFocus />,
    );
    const clear = container.querySelector('.za-custom-input__clear');
    fireEvent.click(clear!);
    const input = container.querySelectorAll('input[type="hidden"]')[0] as HTMLInputElement;
    expect(input.value).toEqual('');
  });

  it('focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <CustomInput className="custom-input" value="test" onFocus={onFocus} />,
    );
    const input = container.querySelector('.za-custom-input');
    fireEvent.click(input!);
    expect(onFocus).toBeCalled();
  });

  it('disabled focus', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <CustomInput className="custom-input" value="test" onFocus={onFocus} disabled />,
    );
    const input = container.querySelector('.za-custom-input');
    fireEvent.click(input!);
    expect(onFocus).toBeCalledTimes(0);
  });

  it('onBlur', () => {
    const onBlur = jest.fn();
    render(<CustomInput type="number" className="custom-input" onBlur={onBlur} autoFocus />);
    fireEvent.click(document.body);
    expect(onBlur).toBeCalledTimes(1);
  });

  it('onKeyClick', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <CustomInput
        type="number"
        className="custom-input"
        onBlur={onBlur}
        autoFocus
        onChange={onChange}
      />,
    );
    const item = container.getElementsByClassName('za-keyboard__item');
    fireEvent.click(item[10]!);
    expect(onBlur).toBeCalledTimes(1);
    fireEvent.click(item[1]!);
    expect(onChange).toBeCalled();
  });

  it('maxLength', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CustomInput
        type="number"
        className="custom-input"
        value="1234"
        maxLength={4}
        autoFocus
        onChange={onChange}
      />,
    );
    const item = container.getElementsByClassName('za-keyboard__item');
    fireEvent.click(item[1]!);
    expect(onChange).toBeCalledTimes(0);
  });
});

describe('CustomInput.Number', () => {
  it('inputNumber value 0', () => {
    const { container } = render(<CustomInput clearable type="number" value={0} />);
    const input = container.querySelectorAll('input[type="hidden"]')[0] as HTMLInputElement;
    expect(input.value).toEqual('0');
  });
});

describe('CustomInput.Price', () => {
  it('renders correctly', () => {
    const wrapper = render(<CustomInput type="price" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe('CustomInput.Idcard', () => {
  it('renders correctly', () => {
    const wrapper = render(<CustomInput type="idcard" maxLength={18} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
