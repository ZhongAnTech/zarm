import { render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import WaterMark from '../index';

describe('WaterMark', () => {
  it('renders correctly', async () => {
    await act(async () => {
      const { asFragment } = render(<WaterMark text="众安科技" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('image watermark', async () => {
    await act(async () => {
      const { asFragment } = render(
        <WaterMark image="https://zarm.design/images/logo.1a6cfc30.svg" />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  const originalError = console.error;
  // @ts-ignore
  // eslint-disable-next-line no-return-assign
  afterEach(() => (console.error = originalError));
  const consoleOutput: any = [];
  const mockedError = (output) => {
    consoleOutput.push(output);
  };
  // eslint-disable-next-line no-return-assign
  beforeEach(() => (console.error = mockedError));

  it.only('canvas non-supported', async () => {
    const mockCanvasContext = jest.spyOn(HTMLCanvasElement.prototype, 'getContext');
    mockCanvasContext.mockReturnValue(null);
    render(<WaterMark />);
    await waitFor(() => {
      expect(consoleOutput).toEqual(['当前环境不支持 Canvas']);
    });
    mockCanvasContext.mockRestore();
  });
});
