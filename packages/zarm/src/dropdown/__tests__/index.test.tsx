import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../index';
import Tabs from "../../tabs";

describe('Tab', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Item title="菜单一">
          <div>菜单一</div>
        </Dropdown.Item>
        <Dropdown.Item title="菜单二">
          <div>菜单二</div>
        </Dropdown.Item>
      </Dropdown>,
    );
    expect(container).toMatchSnapshot();
  });

  it('click trigger', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Dropdown onChange={onChange}>
        <Dropdown.Item title="菜单一">
          <div>菜单一</div>
        </Dropdown.Item>
        <Dropdown.Item title="菜单二">
          <div>菜单二</div>
        </Dropdown.Item>
        <Dropdown.Item title="菜单三">
          <div>菜单三</div>
        </Dropdown.Item>
      </Dropdown>,
    );
    const el = container.querySelectorAll('.za-dropdown__trigger');
    fireEvent.click(el[1]);
    expect(onChange).toBeCalledWith(1);
    const last = el[el.length - 1];
    fireEvent.click(last);
    expect(onChange).toBeCalledWith(2);
  });
});
