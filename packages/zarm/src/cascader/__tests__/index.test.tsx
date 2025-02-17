import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../../button';
import { parseItems } from '../../cascader-view/utils';
import Cascader from '../index';

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

describe('Cascader', () => {
  it('renders correctly if visible is true', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Cascader
        defaultValue={[]}
        value={[]}
        cancelText="取消"
        confirmText="确定"
        visible
        itemRender={(data) => data.label}
        dataSource={District}
        onChange={onChange}
        mountContainer={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('handle props click', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();

    const value = ['340000', '340800', '340803'];
    const { container, getByText } = render(
      <Cascader
        defaultValue={[]}
        value={value}
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

    const items = parseItems(District, value);

    expect(onConfirm).toHaveBeenCalledWith(value, items);

    fireEvent.click(getByText('取消'));
    expect(onCancel).toBeCalled();

    const mask = container.querySelector('.za-mask');
    fireEvent.click(mask!);
    expect(onCancel).toBeCalled();
  });

  it('handle onChange', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <Cascader
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

    fireEvent.click(screen.getAllByDisplayValue('340000')[0]);
    await screen.findByText('安庆市');
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getAllByDisplayValue('340800')[0]);
    await screen.findByText('大观区');
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getAllByDisplayValue('340803')[0]);
    expect(container).toMatchSnapshot();

    const currentValue = ['340000', '340800', '340803'];
    const items = parseItems(District, currentValue);

    expect(onChange).toBeCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(currentValue, items);
  });

  it('static method prompt', async () => {
    const cancel = jest.fn();
    const confirm = jest.fn();
    const CASCADE_DATA = [
      {
        value: '1',
        label: '北京市',
        children: [
          { value: '11', label: '海淀区', children: [] },
          { value: '12', label: '西城区', children: [] },
        ],
      },
      {
        value: '2',
        label: '上海市',
        children: [
          { value: '21', label: '杨浦区', children: [] },
          { value: '22', label: '静安区', children: [] },
        ],
      },
    ];
    const { getByText } = render(
      <Button
        onClick={() => {
          Cascader.prompt({
            defaultValue: ['1', '12'],
            cancelText: 'cancel',
            confirmText: 'confirm',
            dataSource: CASCADE_DATA,
            onCancel: cancel,
            onConfirm: confirm,
          });
        }}
      >
        cascader prompt
      </Button>,
    );
    fireEvent.click(getByText('cascader prompt'));
    fireEvent.click(screen.getAllByDisplayValue('2')[0]);
    await screen.findByText('杨浦区');
    fireEvent.click(getByText('confirm'));

    const currentValue = ['2'];
    const items = parseItems(CASCADE_DATA, currentValue);

    expect(confirm).toHaveBeenCalledWith(currentValue, items);
    fireEvent.click(getByText('cancel'));
    expect(cancel).toHaveBeenCalled();
  });
});
