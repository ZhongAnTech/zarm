import { fireEvent,  render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../../button';
import type { PickerOption } from '../../picker-view/interface';
import Picker from '../index';

describe('Picker', () => {
  it('Picker render visible', () => {
    const { container } = render(
      <Picker
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        visible
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('render custom label', () => {
    const datSource: Array<PickerOption> = [
      {
        code: '1',
        name: '北京市',
        children: [
          { code: '11', name: '海淀区' },
          { code: '12', name: '西城区' },
        ],
      },
      {
        code: '2',
        name: '上海市',
        children: [
          { code: '21', name: '黄埔区' },
          { code: '22', name: '虹口区' },
        ],
      },
    ];
    const { container } = render(
      <Picker
        dataSource={datSource}
        fieldNames={{ label: 'name', value: 'code' }}
        itemRender={(data) => data.name}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should trigger onConfirm when press ok button', () => {
    jest.useFakeTimers();
    const onConfirmFn = jest.fn();

    render(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        visible
        value={['1', '12']}
        onConfirm={onConfirmFn}
      />,
    );

    const confirm = document.body.getElementsByClassName('za-picker__confirm')[0];
    fireEvent.click(confirm);
    jest.runAllTimers();
    expect(onConfirmFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    render(
      <Picker
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        visible
        defaultValue={['1', '12']}
        onCancel={onCancelFn}
      />,
    );

    const cancel = document.body.getElementsByClassName('za-picker__cancel')[0];
    fireEvent.click(cancel);
    expect(onCancelFn).toBeCalled();
  });

  test('imperative call onConfirm', async () => {
    const onConfirm = jest.fn();
    const onClick = async () => {
      await Picker.prompt({
        onConfirm,
        dataSource: [
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ],
      });
    };

    render(<Button onClick={onClick}>picker-prompt</Button>);
    const button = screen.getByText('picker-prompt');
    fireEvent.click(button);
    const confirm = await screen.findByText('确定');
    fireEvent.click(confirm);
    expect(onConfirm).toBeCalled();
  });

  test('imperative call onCancel', async () => {
    const onCancel = jest.fn();
    const onClick = async () => {
      await Picker.prompt({
        onCancel,
        cancelText: 'cancel',
        dataSource: [
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ],
      });
    };

    render(<Button onClick={onClick}>picker-prompt</Button>);
    const button = screen.getByText('picker-prompt');
    fireEvent.click(button);
    const cancel = await screen.findByText('cancel');
    fireEvent.click(cancel);
    expect(onCancel).toBeCalled();
  });
});
