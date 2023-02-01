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

  it('renders onClear called correctly', () => {
    const onChange = jest.fn();
    const { container } = render(<Input clearable value="" onChange={onChange} />);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'My new value' } });
    const clearBtn = container.querySelector('.za-input__clear') as HTMLDivElement;
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalled();
    expect(input.value).toEqual('');
  });
});

describe('Input.Base', () => {
  it('auto focus', () => {
    const { container } = render(<Input className="text-input" autoFocus />);
    const input = container.querySelectorAll('.za-input--focus');
    expect(input.length).toBe(1);
  });

  it('renders onFocus onBlur called correctly', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { container } = render(<Input onFocus={onFocus} onBlur={onBlur} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    expect(onFocus).toBeCalled();
  });

  it('showLength', () => {
    const { container } = render(<Input showLength maxLength={100} type="text" rows={4} defaultValue="测试a"/>);
    const content = container.querySelector('.za-input__length');
    expect(content?.textContent).toEqual('3/100');
  });

});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" rows={4} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('autoHeight', () => {
    const wrapper = render(<Input type="text" rows={4} autoHeight/>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders onFocus called correctly', () => {
    const onFocus = jest.fn();
    const { container } = render(<Input type="text" rows={2} onFocus={onFocus} />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.focus(textarea);
    expect(onFocus).toBeCalled();
    // expect(toJson(wrapper)).toMatchSnapshot();
    //  wrapper.unmount();
  });
});
