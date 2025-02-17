import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from '../index';

describe('SearchBar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const { container } = render(
        <SearchBar shape="round" cancelText="搜索" placeholder="请输入关键字" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders defaultValue correctly', () => {
      const { container } = render(
        <SearchBar
          shape="round"
          cancelText="搜索"
          placeholder="请输入关键字"
          defaultValue="搜索关键字"
        />,
      );
      // wrapper.setProps({ defaultValue: '搜索关键字' });
      expect(container).toMatchSnapshot();
    });

    it('renders showCancel correctly', () => {
      const onChange = jest.fn();
      const { container } = render(
        <SearchBar
          shape="round"
          placeholder="请输入关键字"
          onChange={onChange}
          value="搜索"
          showCancel
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('onCancel called correctly', () => {
    const onCancel = jest.fn();
    const { container } = render(
      <SearchBar shape="round" placeholder="请输入关键字" onCancel={onCancel} showCancel />,
    );
    const input = container.querySelector('input[type="search"]');
    fireEvent.focus(input!);
    const cancel = container.querySelector('.za-search-bar__cancel');
    fireEvent.click(cancel!);
    expect(onCancel).toHaveBeenCalled();
  });

  it('onSubmit called correctly', () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <SearchBar shape="round" placeholder="请输入关键字" onSubmit={onSubmit} />,
    );
    const input = container.querySelector('input[type="search"]');
    fireEvent.change(input!, { target: { value: 'My new value' } });
    const form = container.querySelector('.za-search-bar__form');
    fireEvent.submit(form!);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('onFocus called correctly', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <SearchBar shape="round" placeholder="请输入关键字" onFocus={onFocus} />,
    );
    const el = container.querySelector('input[type="search"]');
    fireEvent.focus(el!);
    expect(onFocus).toBeCalled();
  });

  it('onChange called correctly', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <SearchBar shape="round" placeholder="请输入关键字" onChange={onChange} />,
    );
    const input = container.querySelector('input[type="search"]');
    await userEvent.type(input!, '测试');
    expect(onChange).toBeCalled();
  });
});
