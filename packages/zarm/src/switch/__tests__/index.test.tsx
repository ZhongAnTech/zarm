import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Switch from '../index';

describe('Switch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      const { container } = render(<Switch />);
      expect(container).toMatchSnapshot();
    });

    it('defaultChecked', () => {
      const { container } = render(<Switch defaultChecked />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    it('should switch on if defaultChecked is true', () => {
      const { container } = render(<Switch defaultChecked />);
      const inputWrapper = container.querySelector('input');
      expect(inputWrapper!.disabled).toBeFalsy();
      expect(inputWrapper!.value).toEqual('on');
      expect(inputWrapper!.defaultChecked).toBeTruthy();
    });

    it('should switch off and disabled', () => {
      const { container } = render(<Switch disabled />);
      const inputWrapper = container.querySelector('input');
      expect(inputWrapper!.disabled).toBeTruthy();
      expect(inputWrapper!.value).toEqual('off');
      expect(inputWrapper!.checked).toBeFalsy();
    });

    it('should switch on and disabled', () => {
      const { container } = render(<Switch defaultChecked disabled />);
      const inputWrapper = container.querySelector('input');
      expect(inputWrapper!.disabled).toBeTruthy();
      expect(inputWrapper!.value).toEqual('on');
      expect(inputWrapper!.defaultChecked).toBeTruthy();
    });

    it('should handle change event without updating state', () => {
      const onChange = jest.fn();
      const { container } = render(<Switch checked onChange={onChange} />);
      const input = container.querySelector('input');
      fireEvent.click(input!);
      expect(onChange).toBeCalledWith(false);
      expect(input?.value).toEqual('on');
    });

    it('should handle change event and update state if props.checked is not existed', () => {
      const onChange = jest.fn();
      const { container } = render(<Switch onChange={onChange} />);
      expect(container.querySelector('input')?.value).toEqual('off');
      const input = container.querySelector('input');
      fireEvent.click(input!);
      expect(onChange).toBeCalledWith(true);
    });
  });
});
