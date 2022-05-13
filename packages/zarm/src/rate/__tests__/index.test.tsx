import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Rate from '../index';

describe('Rate', () => {
  it('should be render the specified number of nodes', () => {
    const { container } = render(<Rate count={10} />);
    expect(container).toMatchSnapshot();
    expect(document.getElementsByClassName('za-rate__item')).toHaveLength(10);
  });

  it('should emit change and value event when rate icon is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(<Rate onChange={onChange} />);
    expect(container).toMatchSnapshot();

    const items = [].slice.call(document.getElementsByClassName('za-rate__item'));
    fireEvent.click(items?.[0]);
    expect(onChange).toBeCalled();
  });
});
