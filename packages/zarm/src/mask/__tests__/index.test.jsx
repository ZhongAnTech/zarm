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
      <Mask mountContainer={false} onClick={onClick} visible>
        content
      </Mask>,
    );
    fireEvent.click(wrapper.getByText('content'));
    expect(onClick).toBeCalled();
  });
});
