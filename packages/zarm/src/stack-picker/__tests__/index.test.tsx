import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StackPicker from '../index';

jest.useFakeTimers();

const District = [
  {
    value: '340000',
    label: '安徽省',
    children: [
      {
        value: '340800',
        label: '安庆市',
        children: [
          {
            value: '340803',
            label: '大观区',
            children: [],
          },
          {
            value: '340822',
            label: '怀宁县',
            children: [],
          },
          {
            value: '340882',
            label: '其它区',
            children: [],
          },
        ],
      },
    ],
  },
  {
    value: '310000',
    label: '上海',
    children: [
      {
        value: '310100',
        label: '上海市',
        children: [
          {
            value: '310113',
            label: '宝山区',
            children: [],
          },
          {
            value: '310105',
            label: '长宁区',
            children: [],
          },
          {
            value: '310230',
            label: '崇明县',
            children: [],
          },
          {
            value: '310152',
            label: '川沙区',
            children: [],
          },
        ],
      },
    ],
  },
];

describe('StackPicker', () => {
  it('renders correctly if visible is true', () => {
    const onChange = jest.fn();
    const { container } = render(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        confirmText="确定"
        visible
        valueMember="value"
        itemRender={(data) => data.label}
        dataSource={District}
        onChange={onChange}
        mountContainer={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly if visible is false', () => {
    const onChange = jest.fn();
    render(
      <StackPicker
        title="层叠选择器"
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        confirmText="确定"
        visible={false}
        valueMember="value"
        itemRender={(data) => data.label}
        dataSource={District}
        onChange={onChange}
        mountContainer={false}
      />,
    );
    expect(screen.queryByText('层叠选择器')).toBeFalsy();
  });

  it('handle props click', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();

    const { container, getByText } = render(
      <StackPicker
        defaultValue={[]}
        value={['340000', '340800', '340803']}
        cancelText="取消"
        confirmText="确定"
        visible
        maskClosable
        dataSource={District}
        onCancel={onCancel}
        onConfirm={onConfirm}
        mountContainer={false}
      />,
    );

    fireEvent.click(getByText('确定'));
    expect(onConfirm).toHaveBeenCalledWith(['340000', '340800', '340803']);

    fireEvent.click(getByText('取消'));
    expect(onCancel).toBeCalled();

    const mask = container.querySelector('.za-mask');
    fireEvent.click(mask!);
    expect(onCancel).toBeCalled();
  });

  it('handle onChange', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <StackPicker
        data-testid="root"
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        confirmText="确定"
        visible
        dataSource={District}
        onChange={onChange}
        mountContainer={false}
      />,
    );

    // popupWrapper = mount(wrapper.instance().getComponent());

    fireEvent.click(screen.getAllByDisplayValue('340800')[0]);
    await screen.findByText('大观区');
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getAllByDisplayValue('340803')[0]);
    expect(container).toMatchSnapshot();

    expect(onChange).toBeCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(['340000', '340800', '340803']);
  });
});

describe('StackPicker error type', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('handle props error type', () => {
    const onCancel = 1 as any;
    const onConfirm = 1 as any;
    const onChangeValidate = 1 as any;
    const onChange = 1 as any;

    const { getByText } = render(
      <StackPicker
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        confirmText="确定"
        visible
        dataSource={District}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onChange={onChange}
        onChangeValidate={onChangeValidate}
      />,
    );

    fireEvent.click(getByText('取消'));
    expect(consoleSpy).toHaveBeenCalledWith('onCancel need a function');

    fireEvent.click(getByText('确定'));
    expect(consoleSpy).toHaveBeenCalledWith('onConfirm need a function');

    fireEvent.click(screen.getAllByDisplayValue('340000')[0]);
    expect(consoleSpy).toHaveBeenCalledWith('onChange need a function');

    consoleSpy.mockRestore();
  });
});
