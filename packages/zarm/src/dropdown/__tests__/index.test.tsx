import React from 'react';
import {render, fireEvent, screen, waitFor, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../index';

const classPrefix = `za-dropdown`;

describe('Dropdown', () => {
  test('basic usage', async () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Item title='sorter' itemKey='sorter'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    fireEvent.click(screen.getByText('sorter'))
    const content = screen.getByText('content')
    expect(content).toBeInTheDocument()
    expect(container.querySelector(`.${classPrefix}__trigger`)).toHaveClass(
      `${classPrefix}__trigger--active`
    )

    fireEvent.click(document.body)
    waitFor(() => expect(content).not.toBeVisible())
  })

  test('multi item', () => {
    const { container } = render(
      <Dropdown data-testid='dropdown'>
        <Dropdown.Item title='item1' itemKey='item1'>
          content1
        </Dropdown.Item>
        <Dropdown.Item title='item2' itemKey='item2'>
          content2
        </Dropdown.Item>
      </Dropdown>
    )

    fireEvent.click(screen.getByText('item1'))
    expect(screen.getByText('content1')).toBeVisible()
    expect(container.querySelectorAll(`.${classPrefix}__trigger`)[0]).toHaveClass(
      `${classPrefix}__trigger--active`
    )
    fireEvent.click(screen.getByText('item2'))
    expect(screen.getByText('content2')).toBeVisible()
    expect(container.querySelectorAll(`.${classPrefix}__trigger`)[1]).toHaveClass(
      `${classPrefix}__trigger--active`
    )
  })

  test('renders with invalid react element', () => {
    render(<Dropdown>{1}</Dropdown>)
    expect(screen.getByText(1)).toBeInTheDocument()
  })
})
