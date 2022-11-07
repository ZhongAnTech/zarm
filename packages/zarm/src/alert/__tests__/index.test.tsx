import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  it('should render correctly', () => {
    render(<Alert animationType="door" visible />);
    expect(document.body.querySelectorAll('.za-alert')).toHaveLength(1);
  });
});
