import React from 'react';
import { render } from '@testing-library/react';
import PickerView from '../index';
import type { PickerDataSource } from '../interface';

// TODO: make mock package for better-scroll package
const bsScrollInstance = {
  on: jest.fn().mockImplementationOnce((event, handler) => {
    if (event === 'scrollEnd') {
      handler();
    }
  }),
  destroy: jest.fn(),
  getSelectedIndex: jest.fn(),
  refresh: jest.fn(),
  wheelTo: jest.fn(),
  disable: jest.fn(),
  stop: jest.fn(),
};

jest.mock('better-scroll', () => {
  return jest.fn(() => bsScrollInstance);
});

describe('PickerView', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should not render wheels if datasource is empty', () => {
    const { container } = render(<PickerView />);
    expect(container.querySelector('.za-picker-view__content')?.children).toHaveLength(0);
  });

  it('should render wheels if datasource is not empty', () => {
    const dataSource: PickerDataSource = [
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
    ];
    const { container } = render(<PickerView dataSource={dataSource} />);
    expect(container.querySelector('.za-picker-view__content')?.children).toHaveLength(1);
  });

  it('should render with correct className', () => {
    const { container } = render(<PickerView className="foo" />);
    expect(container.querySelectorAll('.za-picker-view__content')).toHaveLength(1);
    expect(container.querySelectorAll('.za-picker-view__mask')).toHaveLength(2);
    expect(container.querySelectorAll('.za-picker-view__mask--top')).toHaveLength(1);
    expect(container.querySelectorAll('.za-picker-view__mask--bottom')).toHaveLength(1);
  });

  it('PickerView render visible', () => {
    const { container } = render(
      <PickerView
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('PickerView disabled', () => {
    const onChange = jest.fn();
    const { container } = render(
      <PickerView
        disabled
        onChange={onChange}
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(onChange).not.toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
