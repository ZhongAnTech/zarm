import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import CustomInput from '../index';

describe('CustomInput', () => {
  it('renders correctly', () => {
    const wrapper = render(<CustomInput type="number" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it("renders correctly if type isn't valid", () => {
    const wrapper = render(<CustomInput type="xxx" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('auto focus', () => {
    const { container } = render(<CustomInput autoFocus className="custom-input" />);
    const input = container.getElementsByClassName('za-custom-input--focus');
    expect(input).toHaveLength(1);
  });
});

describe('CustomInput.Number', () => {
  it('inputNumber value 0', () => {
    const { container } = render(<CustomInput clearable type="number" value={0} />);
    const input = container.querySelectorAll('input[type="hidden"]');
    expect(input[0].value).toEqual('0');
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
