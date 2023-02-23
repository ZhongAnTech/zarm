import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import DatePicker from '../index';
import Button from '../../button';

describe('DatePicker', () => {
  it('snapshot', () => {
    const wrapper = render(<DatePicker />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should trigger onConfirm when press ok button', () => {
    const onConfirmFn = jest.fn();
    render(<DatePicker value={new Date('2009/3/4')} visible onConfirm={onConfirmFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__confirm')[0]);
    expect(onConfirmFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onCancelFn = jest.fn();

    render(<DatePicker value={new Date('2009/3/4')} visible onCancel={onCancelFn} />);
    fireEvent.click(document.body.querySelectorAll('.za-picker__cancel')[0]);
    expect(onCancelFn).toBeCalled();
  });

  it('static method prompt', async () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const { getByText } = render(
      <Button
        size="xs"
        onClick={async () => {
          await DatePicker.prompt(
            {
              defaultValue: new Date('2023/2/23'),
              onConfirm: confirm,
              onCancel: cancel,
              confirmText: 'date picker confirm',
              cancelText: 'date picker cancel'
            }
          );
        }}
      >
        date picker
      </Button>
    )
    const btn = getByText('date picker');
    fireEvent.click(btn);
    fireEvent.click(getByText('date picker confirm'));
    expect(confirm).toHaveBeenCalledWith(new Date('2023/2/23'), [{"label": "2023年", "value": 2023}, {"label": "2月", "value": 2}, {"label": "23日", "value": 23}]);
    // fireEvent.click(btn);
    fireEvent.click(getByText('date picker cancel'));
    expect(cancel).toBeCalled();
  })
});
