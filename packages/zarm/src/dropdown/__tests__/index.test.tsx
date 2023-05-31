import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Dropdown from '../index';

describe('Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Dropdown>
        <Dropdown.Item key="1" title="Header of Item2">
          This is content of item2.
        </Dropdown.Item>
        <Dropdown.Item key="2" title="Header of Item3">
          This is content of item3.
        </Dropdown.Item>
      </Dropdown>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should trigger onChange', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Dropdown onChange={onChangeFn}>
        <Dropdown.Item key="key1" title="Header of Item2">
          This is content of item2.
        </Dropdown.Item>
        <Dropdown.Item key="key2" title="Header of Item3">
          This is content of item3.
        </Dropdown.Item>
      </Dropdown>,
    );
    fireEvent.click(container.querySelectorAll('.za-dropdown__bar-item')[0]);
    expect(onChangeFn).toBeCalled();
    expect(onChangeFn).toBeCalledWith('key1');
  });

  it('toggle click dropdown', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Dropdown onChange={onChangeFn}>
        <Dropdown.Item key="key1" title="Header of Item2">
          This is content of item2.
        </Dropdown.Item>
        <Dropdown.Item key="key2" title="Header of Item3">
          This is content of item3.
        </Dropdown.Item>
      </Dropdown>,
    );
    const items = container.querySelectorAll('.za-dropdown__bar-item');

    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledWith('key1');

    fireEvent.click(items[1]);
    expect(onChangeFn).toBeCalledWith('key2');
  });

  it('should be disabled', () => {
    const onChangeFn = jest.fn();
    const { container } = render(
      <Dropdown disabled onChange={onChangeFn}>
        <Dropdown.Item key="1" title="Header of Item2">
          This is content of item2.
        </Dropdown.Item>
        <Dropdown.Item key="2" title="Header of Item3">
          This is content of item3.
        </Dropdown.Item>
      </Dropdown>,
    );
    const items = container.querySelectorAll('.za-dropdown__bar-item');

    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledTimes(0);
    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledTimes(0);
  });

  it('render custom arrow node on Dropdown', () => {
    const mockIcon = () => <div className="mock-icon" />;
    const { container } = render(
      <Dropdown arrow={mockIcon()}>
        <Dropdown.Item key="key1" title="菜单一">
          内容一
        </Dropdown.Item>
        <Dropdown.Item key="key2" title="菜单二" arrow={mockIcon()}>
          内容二
        </Dropdown.Item>
      </Dropdown>,
    );

    expect(container.querySelectorAll('.mock-icon')).toHaveLength(2);
  });
});
