import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Mask from '../index';

describe('Mask', () => {
  it('renders correctly', () => {
    const wrapper = render(<Mask mountContainer={false} visible />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('color is transparent', () => {
    const wrapper = render(<Mask mountContainer={false} color="transparent" visible />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = render(
      <Mask mountContainer={false} data-testid="root" onClick={onClick} visible />,
    );
    fireEvent.click(wrapper.getByTestId('root'));
    expect(onClick).toBeCalled();
  });
});
