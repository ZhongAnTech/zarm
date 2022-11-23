import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from '../index';

describe('Tab', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correctly vertical', () => {
    const { container } = render(
      <Tabs direction="vertical">
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toMatchSnapshot();
  });

  it('canSwipe', () => {
    const { container } = render(
      <Tabs swipeable>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toMatchSnapshot();
  });

  it('lineWidth is auto', () => {
    const { container } = render(
      <Tabs lineWidth="auto">
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toMatchSnapshot();
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabs onChange={onChange} value={1}>
        <Tabs.Panel title="选项卡1">
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toMatchSnapshot();
  });

  it('click tabs', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabs scrollable onChange={onChange}>
        <Tabs.Panel title="选项卡1" disabled>
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    const el = container.querySelectorAll('.za-tabs__tab');
    fireEvent.click(el[1]);
    expect(onChange).toBeCalledWith(1);
    const last = el[el.length - 1];
    fireEvent.click(last);
    expect(onChange).toBeCalledWith(2);
  });

  it('scroll tabs', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabs swipeable onChange={onChange} scrollable>
        <Tabs.Panel title="选项卡1" disabled>
          <div>试试点我左滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡4">
          <div>试试点我右滑</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡5">
          <div>试试点我右滑</div>
        </Tabs.Panel>
      </Tabs>,
    );
    const el = container.querySelectorAll('.za-tabs__tab');
    const last = el[el.length - 1];
    fireEvent.click(last);
    expect(onChange).toBeCalledWith(4);
  });
});
