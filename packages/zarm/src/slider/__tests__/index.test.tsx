import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Slider from '../index';

describe('Slider', () => {
  const marks = {
    0: '0',
    26: '26',
    60: '60',
    100: '100',
  };

  describe('snapshot', () => {
    it('shallows correctly', () => {
      const { container } = render(<Slider />);
      expect(container).toMatchSnapshot();
    });

    it('min', () => {
      const { container } = render(<Slider min={0} />);
      expect(container).toMatchSnapshot();
    });

    it('max', () => {
      const { container } = render(<Slider max={100} />);
      expect(container).toMatchSnapshot();
    });

    it('step', () => {
      const { container } = render(<Slider step={5} />);
      expect(container).toMatchSnapshot();
    });

    it('disabled', () => {
      const { container } = render(<Slider disabled />);
      expect(container).toMatchSnapshot();
    });

    it('defaultValue', () => {
      const { container } = render(<Slider defaultValue={10} />);
      expect(container).toMatchSnapshot();
    });

    it('value', () => {
      const { container } = render(<Slider value={10} />);
      expect(container).toMatchSnapshot();
    });

    it('showMark', () => {
      const { container } = render(<Slider showMark marks={marks} />);
      expect(container).toMatchSnapshot();
    });

    it('marks', () => {
      const { container } = render(<Slider marks={marks} />);
      expect(container).toMatchSnapshot();
    });

    it('marks error', () => {
      const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
      const { container } = render(<Slider showMark />);
      expect(container).toMatchSnapshot();
      expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
    });

    it('vertical', () => {
      const { container } = render(<Slider vertical />);
      expect(container).toMatchSnapshot();
    });

    it('vertical and marks', () => {
      const { container } = render(<Slider vertical showMark marks={marks} />);
      expect(container).toMatchSnapshot();
    });
  });

  it('should not render mark info if marks is an empty object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const { container } = render(<Slider showMark marks={{}} />);
    const el = container.querySelectorAll('.za-slider__marks');
    expect(el).toHaveLength(0);
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should not render mark info if marks is NOT an object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const { container } = render(<Slider showMark marks={null as any} />);
    const el = container.querySelectorAll('.za-slider__marks');
    expect(el).toHaveLength(0);
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should render mark info with custom marks', () => {
    const MARKS = {
      0: '0°C',
      26: '26°C',
      65: '65°C',
      100: '100°C',
    };
    const { container } = render(<Slider showMark marks={MARKS} value={55} />);
    const el = container.querySelectorAll('.za-slider__mark');
    expect(el).toHaveLength(4);
    expect(Array.from(el!).map((mark) => mark.textContent)).toEqual(
      expect.arrayContaining(['100°C', '0°C', '26°C', '65°C']),
    );
    expect(
      Array.from(el!).map((mark) => {
        const style = window.getComputedStyle(mark);
        return style ? style.left : '';
      }),
    ).toEqual(expect.arrayContaining(['0%', '26%', '65%', '100%']));
    expect(
      Array.from(container.querySelectorAll('.za-slider__dot'))
        .map((dot) => dot.className)
        .filter((className) => {
          if (className) {
            return className.includes('za-slider__dot--active');
          }
          return false;
        }),
    ).toHaveLength(2);
  });

  it('mouse event', () => {
    const onChange = jest.fn();
    const onSlideChange = jest.fn();
    const { getByTestId } = render(
      <div data-testid="za-slider-el">
        <Slider onChange={onChange} style={{ width: 200 }} onSlideChange={onSlideChange} />
      </div>,
    );
    const wrapper = getByTestId('za-slider-el').getElementsByClassName('za-slider__knob');
    const element = [].slice.call(wrapper);
    fireEvent.mouseDown(element?.[0], { pointerId: 15, clientX: 10, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element?.[0], { pointerId: 15, clientX: 200, clientY: 0, buttons: 1 });
    fireEvent.mouseMove(element?.[0], { pointerId: 15, clientX: 250, clientY: 0, buttons: 1 });
    fireEvent.mouseUp(element?.[0], { pointerId: 15 });
    expect(onChange).toBeCalled();
    expect(onSlideChange).toBeCalled();
  });

  it('track click', () => {
    const MARKS = {
      0: '0°C',
      26: '26°C',
      65: '65°C',
      100: '100°C',
    };
    const onChange = jest.fn();
    const { getByTestId } = render(
      <div data-testid="za-slider-el">
        <Slider onChange={onChange} style={{ width: 200 }} marks={MARKS} />
      </div>,
    );
    const line = getByTestId('za-slider-el').querySelector('.za-slider__line');
    fireEvent.click(line!);
    expect(onChange).toBeCalled();
  });
});
