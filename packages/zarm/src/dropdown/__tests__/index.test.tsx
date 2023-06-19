import { fireEvent, getAllByText, render, screen } from '@testing-library/react';
import React from 'react';
import Dropdown, { DropdownProps } from '../index';

const DemoDropdown = (props: DropdownProps = {}) => (
  <Dropdown {...props}>
    <Dropdown.Item key="key1" title="Header of Item1">
      Content item1.
    </Dropdown.Item>
    <Dropdown.Item key="key2" title="Header of Item2">
      Content item2.
    </Dropdown.Item>
  </Dropdown>
);

describe('Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = render(<DemoDropdown />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should trigger onChange', () => {
    const onChangeFn = jest.fn();
    const { container } = render(<DemoDropdown onChange={onChangeFn} />);
    fireEvent.click(container.querySelectorAll('.za-dropdown__bar-item')[0]);
    expect(onChangeFn).toBeCalled();
    expect(onChangeFn).toBeCalledWith('key1');
  });

  it('toggle click dropdown', () => {
    const onChangeFn = jest.fn();
    const { container } = render(<DemoDropdown onChange={onChangeFn} />);

    const items = container.querySelectorAll('.za-dropdown__bar-item');

    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledWith('key1');

    fireEvent.click(items[1]);
    expect(onChangeFn).toBeCalledWith('key2');
  });

  it('should be disabled', () => {
    const onChangeFn = jest.fn();
    const { container } = render(<DemoDropdown onChange={onChangeFn} disabled />);
    const items = container.querySelectorAll('.za-dropdown__bar-item');

    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledTimes(0);
    fireEvent.click(items[0]);
    expect(onChangeFn).toBeCalledTimes(0);
  });

  it('render custom arrow node on Dropdown', () => {
    const MockIcon = () => <div className="mock-icon" />;
    const { container } = render(<DemoDropdown arrow={<MockIcon />} />);
    expect(container.querySelectorAll('.mock-icon')).toHaveLength(2);
  });

  it('define dropdown direction', async () => {
    const { container } = render(<DemoDropdown direction="up" />);

    const items = container.querySelectorAll('.za-dropdown__bar-item');
    fireEvent.click(items[0]);

    const popupDomList = await screen.getByText((_, element) =>
      element!.classList.contains('za-popup--bottom'),
    );

    expect(popupDomList).not.toBeNull();
  });

  it('define default activeKey', async () => {
    const { container } = render(<DemoDropdown defaultActiveKey="key2" />);
    const items = container.querySelectorAll('.za-dropdown__bar-item');

    expect(items[1].classList.contains('za-dropdown__bar-item--active')).toBeTruthy();

    const dropdownItems = await screen.getAllByText((_, element) =>
      element!.classList.contains('za-dropdown-item'),
    );
    const element = getAllByText(dropdownItems[0], 'Content item2.');
    expect(element).toHaveLength(1);
  });
});
