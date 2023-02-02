import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Stepper from '../index';

describe('Stepper', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<Stepper onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly button size lg ', () => {
    const onChange = jest.fn();
    const { container } = render(<Stepper onChange={onChange} size="lg" />);
    expect(container).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const { container } = render(<Stepper defaultValue={2} />);
    expect(container).toMatchSnapshot();
  });

  it('disabled sub or plus click', async () => {
    const onChange = jest.fn();

    const { container } = render(<Stepper max={2} min={0} onChange={onChange} />);

    // wrapper.setProps({ value: 0 });
    fireEvent.click(container.querySelector('.za-stepper__sub') as HTMLDivElement);

    await waitFor(() => {
      expect((container.querySelector('input') as HTMLInputElement).value).toBe("0");
    })

    // wrapper.setProps({ value: 2 });
    const plus = container.querySelector('.za-stepper__plus') as HTMLDivElement;
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    await waitFor(() => {
      expect((container.querySelector('input') as HTMLInputElement).value).toBe("2");
    })
  });


  it('onInputChange', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    const { container } = render(
      <Stepper min={undefined} max={undefined} onChange={onChange} onInputChange={onInputChange} />,
    );

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 10 } });
    expect(onInputChange).toBeCalled();
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Stepper onChange={onChange} />,
    );
    const plus = container.querySelector('.za-stepper__plus') as HTMLDivElement;
    fireEvent.click(plus);
    expect(onChange).toBeCalled();
  });

  it('decimal step', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const { container } = render(
      <Stepper onChange={onChange} onInputChange={onInputChange} step={0.1} value={1} />,
    );
    const sub = container.querySelector('.za-stepper__sub') as HTMLDivElement;
    fireEvent.click(sub);
    expect((container.querySelector('input') as HTMLInputElement).value).toBe('0.9');
    const plus = container.querySelector('.za-stepper__plus') as HTMLDivElement;
    fireEvent.click(plus);
    fireEvent.click(plus);
    expect((container.querySelector('input') as HTMLInputElement).value).toBe('1.1');
  });

  it('disable work', () => {
    const onChange = jest.fn();
    const { container } = render(<Stepper disabled step={0.1} value={1} />);
    const sub = container.querySelector('.za-stepper__sub') as HTMLDivElement;
    fireEvent.click(sub);
    const plus = container.querySelector('.za-stepper__plus') as HTMLDivElement;
    fireEvent.click(plus);
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
