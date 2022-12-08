import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Toast from '../index';

const waitForContentShow = async (content: string) => {
  await waitFor(() => {
    screen.getByText(content);
  });
};

describe('Toast', () => {
  test('string', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show('content');
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('content');
    expect(getByText('content')).toBeInTheDocument();
  });
});
