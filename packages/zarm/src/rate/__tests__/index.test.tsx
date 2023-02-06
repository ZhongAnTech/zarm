import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Rate from '../index';

describe('Rate', () => {
  const getBoundingClientRectMock = jest.spyOn(
    HTMLElement.prototype,
    'getBoundingClientRect'
  );

  beforeAll(() => {
    getBoundingClientRectMock.mockReturnValue({
      left: 20,
      width: 300,
    } as DOMRect);
  })
  it('renders correctly', () => {
    const { container } = render(<Rate allowHalf />);
    expect(container).toMatchSnapshot();
  });

  it('should be render the specified number of nodes', () => {
    const { container } = render(<Rate count={10} />);
    expect(container).toMatchSnapshot();
    expect(document.getElementsByClassName('za-rate__item')).toHaveLength(10);
  });

  it('should emit change and value event when rate icon is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} allowClear />);
    expect(container).toMatchSnapshot();

    const items = [].slice.call(document.getElementsByClassName('za-rate__item'));
    fireEvent.click(items?.[0]);
    expect(onChange).toBeCalled();
    fireEvent.click(items?.[0]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('readOnly should be work', () => {
    const onChange = jest.fn();
    const { container } = render(<Rate count={10} readonly onChange={onChange} />);
    const items = container.getElementsByClassName('za-rate__item');
    fireEvent.click(items?.[0]);
    expect(onChange).toBeCalledTimes(0);
  });

  it('drag should be work', () => {
    const onChange = jest.fn();
    const { container } = render(<Rate count={10} onChange={onChange} allowHalf />);
    const rate = container.querySelector('.za-rate');
    fireEvent.mouseDown(rate!, { pointerId: 15, clientX: 10,  buttons: 1 } );
    fireEvent.mouseMove(rate!, { pointerId: 15, clientX: 100,  buttons: 1 } );
    fireEvent.mouseUp(rate!, { pointerId: 15, clientX: 200, buttons: 1 } );
    expect(onChange).toBeCalled();
  });
});
