import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Picker from '../index';

interface MockScrollInstance {
  selectedIndex: number;
  stop: jest.Mock;
}

const mockScrollInstances: MockScrollInstance[] = [];

jest.mock('@better-scroll/core', () => {
  class MockBScroll {
    static use = jest.fn();

    selectedIndex: number;

    scroller: { wrapper: HTMLElement };

    stop = jest.fn();

    constructor(wrapper: HTMLElement, options: { wheel: { selectedIndex: number } }) {
      this.selectedIndex = options.wheel.selectedIndex;
      this.scroller = { wrapper };
      mockScrollInstances.push(this);
    }

    on = jest.fn();

    destroy = jest.fn();

    getSelectedIndex = jest.fn(() => this.selectedIndex);

    refresh = jest.fn();

    wheelTo = jest.fn();

    disable = jest.fn();
  }

  return {
    __esModule: true,
    default: MockBScroll,
  };
});

jest.mock('@better-scroll/wheel', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Picker confirm while scrolling', () => {
  afterEach(() => {
    mockScrollInstances.length = 0;
  });

  it('confirms the wheel position instead of the value from the previous scroll end', () => {
    const onConfirm = jest.fn();
    const dataSource = [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
    ];

    render(<Picker dataSource={dataSource} defaultValue={['5']} visible onConfirm={onConfirm} />);

    expect(mockScrollInstances).toHaveLength(1);
    mockScrollInstances[0].selectedIndex = 0;

    fireEvent.click(document.body.querySelector('.za-picker__confirm')!);

    expect(mockScrollInstances[0].stop).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(['1'], [dataSource[0]]);
  });

  it('reads the final position from every independent column', () => {
    const onConfirm = jest.fn();
    const dataSource = [
      [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
      ],
      [
        { value: 'a', label: '选项 A' },
        { value: 'b', label: '选项 B' },
      ],
    ];

    render(
      <Picker dataSource={dataSource} defaultValue={['1', 'a']} visible onConfirm={onConfirm} />,
    );

    mockScrollInstances.forEach((instance) => {
      instance.selectedIndex = 1;
    });
    fireEvent.click(document.body.querySelector('.za-picker__confirm')!);

    expect(onConfirm).toHaveBeenCalledWith(['2', 'b'], [dataSource[0][1], dataSource[1][1]]);
  });

  it('resolves child columns again when a cascading parent changes', () => {
    const onConfirm = jest.fn();
    const dataSource = [
      {
        value: '1',
        label: '选项一',
        children: [
          { value: '11', label: '选项 11' },
          { value: '12', label: '选项 12' },
        ],
      },
      {
        value: '2',
        label: '选项二',
        children: [
          { value: '21', label: '选项 21' },
          { value: '22', label: '选项 22' },
        ],
      },
    ];

    render(
      <Picker dataSource={dataSource} defaultValue={['1', '12']} visible onConfirm={onConfirm} />,
    );

    mockScrollInstances[0].selectedIndex = 1;
    fireEvent.click(document.body.querySelector('.za-picker__confirm')!);

    expect(mockScrollInstances[0].stop).toHaveBeenCalledTimes(1);
    expect(mockScrollInstances[1].stop).not.toHaveBeenCalled();
    expect(onConfirm).toHaveBeenCalledWith(
      ['2', '21'],
      [{ value: '2', label: '选项二' }, dataSource[1].children[0]],
    );
  });
});
