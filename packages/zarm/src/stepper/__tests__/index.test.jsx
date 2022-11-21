import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Stepper from '../index';
import Input from '../../input';

describe('Stepper', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<Stepper onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const { container } = render(<Stepper defaultValue={2} />);
    expect(container).toMatchSnapshot();
  });

  it('disabled sub or plus click', () => {
    const onChange = jest.fn();

    const { container } = render(<Stepper max={2} min={0} onChange={onChange} />);

    // wrapper.setProps({ value: 0 });
    fireEvent.click(container.querySelector('.za-stepper__sub'));

    setTimeout(() => expect(container.querySelector('input').value).toBe(0));

    // wrapper.setProps({ value: 2 });
    const plus = container.querySelector('.za-stepper__plus');
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    // wrapper.find('.za-stepper__plus').at(0).simulate('click');
    setTimeout(() => expect(container.querySelector('input').value).toBe(2));
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    render(<Stepper onChange={onChange} value={10} />);
  });

  it('onChange and onInputChange', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    const { container } = render(
      <Stepper min={null} max={null} onChange={onChange} onInputChange={onInputChange} />,
    );

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 10 } });
    expect(onInputChange).toBeCalled();

    // wrapper.setProps({ value: 10 });
    // wrapper.find('.za-stepper__sub').simulate('click');
    // expect(onChange).toBeCalledWith(9);

    // wrapper.setProps({ value: 9 });
    // wrapper.find('.za-stepper__plus').simulate('click');
    // expect(onChange).toBeCalledWith(10);
  });

  // it('input value is NaN', () => {
  //   const onChange = jest.fn();
  //   const onInputChange = jest.fn();

  //   const wrapper = shallow(
  //     <Stepper min={0} max={20} value={10} onChange={onChange} onInputChange={onInputChange} />,
  //   );

  //   wrapper
  //     .find(Input)
  //     .at(0)
  //     .simulate('change', { target: { value: '你好' } });
  //   wrapper.find(Input).at(0).simulate('blur');
  //   expect(onChange).toBeCalledWith(10);
  // });

  // it('out of range', () => {
  //   const onChange = jest.fn();
  //   const onInputChange = jest.fn();
  //   const wrapper = mount(
  //     <Stepper min={0} max={20} onChange={onChange} onInputChange={onInputChange} />,
  //   );

  //   wrapper.setProps({ value: -2 });
  //   wrapper.find(Input).at(0).simulate('blur');
  //   setTimeout(() => expect(onChange).toBeCalledWith(0));

  //   wrapper.setProps({ value: 30 });
  //   wrapper.find(Input).at(0).simulate('blur');
  //   setTimeout(() => expect(onChange).toBeCalledWith(20));
  // });

  it('decimal step', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const { container } = render(
      <Stepper onChange={onChange} onInputChange={onInputChange} step="0.1" value="1" />,
    );
    const sub = container.querySelector('.za-stepper__sub');
    fireEvent.click(sub);
    expect(container.querySelector('input').value).toBe('0.9');
    const plus = container.querySelector('.za-stepper__plus');
    fireEvent.click(plus);
    fireEvent.click(plus);
    expect(container.querySelector('input').value).toBe('1.1');
  });

  it('disable work', () => {
    const onChange = jest.fn();
    const { container } = render(<Stepper disabled step="0.1" value="1" />);
    const sub = container.querySelector('.za-stepper__sub');
    fireEvent.click(sub);
    const plus = container.querySelector('.za-stepper__plus');
    fireEvent.click(plus);
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
