import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CascaderView from '../index';

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
  it('renders correctly', () => {
    const { container } = render(<CascaderView dataSource={District} />);
    expect(container).toMatchSnapshot();
  });

  it('basic usage', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <CascaderView
        data-testid="root"
        defaultValue={[]}
        value={[]}
        dataSource={District}
        onChange={onChange}
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

    expect(onChange).toBeCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(['340000', '340800', '340803']);
  });
});
