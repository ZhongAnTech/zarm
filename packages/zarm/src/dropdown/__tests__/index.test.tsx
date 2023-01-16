import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Dropdown from '../index';

const classPrefix = `adm-dropdown`

describe('Dropdown', () => {
  test('basic usage', async () => {
    render(
      <Dropdown data-testid='dropdown'>
        <Dropdown.Item title='sorter' key='sorter' data-testid='item'>
          content
        </Dropdown.Item>
      </Dropdown>
    )

    fireEvent.click(screen.getByText('sorter'))
    const content = screen.getByText('content')
    expect(content).toBeInTheDocument()
    expect(screen.getByTestId('dropdown')).toHaveClass(`${classPrefix}-open`)
    expect(screen.getByTestId('item')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )

    fireEvent.click(document.body)
    waitFor(() => expect(content).not.toBeVisible())
  })

  test('multi item', () => {
    render(
      <Dropdown data-testid='dropdown'>
        <Dropdown.Item title='item1' itemKey='item1' data-testid='item1'>
          content1
        </Dropdown.Item>
        <Dropdown.Item title='item2' itemKey='item2' data-testid='item2'>
          content2
        </Dropdown.Item>
      </Dropdown>
    )

    fireEvent.click(screen.getByText('item1'))
    expect(screen.getByText('content1')).toBeVisible()
    expect(screen.getByTestId('item1')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )
    fireEvent.click(screen.getByText('item2'))
    expect(screen.getByText('content2')).toBeVisible()
    expect(screen.getByTestId('item2')).toHaveClass(
      `${classPrefix}-item-active ${classPrefix}-item-highlight`
    )
  })

  test('renders with invalid react element', () => {
    render(<Dropdown>{1}</Dropdown>)
    expect(screen.getByText(1)).toBeInTheDocument()
  })
})
