import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import PinchZoom from '../index';

describe('PinchZoom', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const { container } = render(<PinchZoom />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('pinchZoom event', () => {
    it('wheel event', async () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <PinchZoom minScale={1} maxScale={3} onPinchZoom={mockOnChange}>
          <img
            src="https://cdn-health.zhongan.com/magiccube/resource/s/hSE9buCehy.png"
            style={{ maxWidth: '100%' }}
            alt=""
          />
        </PinchZoom>,
      );
      const el = container.querySelector('.za-pinch-zoom');
      fireEvent.wheel(el!, { deltaMode: 1, pageX: 100, pageY: 100 });
      await waitFor(() => {
        expect(mockOnChange).toBeCalled();
      });
    });

    it('touch event', async () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <PinchZoom minScale={1} maxScale={3} onPinchZoom={mockOnChange}>
          <img
            src="https://cdn-health.zhongan.com/magiccube/resource/s/hSE9buCehy.png"
            style={{ maxWidth: '100%' }}
            alt=""
          />
        </PinchZoom>,
      );
      const el = container.querySelector('.za-pinch-zoom');
      fireEvent.touchStart(el!, { touches: [{ pageX: 20, pageY: 30 }] });
      fireEvent.touchMove(el!, { touches: [{ pageX: 20, pageY: 30 }] });
      fireEvent.touchEnd(el!, { touches: [{ pageX: 30, pageY: 40 }] });
      fireEvent.touchStart(el!, {
        touches: [
          { pageX: 35, pageY: 45 },
          { pageX: 50, pageY: 60 },
        ],
      });
      fireEvent.touchMove(el!, {
        touches: [
          { pageX: 40, pageY: 60 },
          { pageX: 60, pageY: 80 },
        ],
      });
      fireEvent.touchMove(el!, {
        touches: [
          { pageX: 120, pageY: 120 },
          { pageX: 150, pageY: 160 },
        ],
      });
      fireEvent.touchMove(el!, {
        touches: [
          { pageX: 160, pageY: 180 },
          { pageX: 180, pageY: 210 },
        ],
      });
      fireEvent.touchMove(el!, {
        touches: [
          { pageX: 200, pageY: 220 },
          { pageX: 240, pageY: 250 },
        ],
      });
      fireEvent.touchMove(el!, {
        touches: [
          { pageX: 230, pageY: 260 },
          { pageX: 280, pageY: 320 },
        ],
      });
      fireEvent.touchEnd(el!, { touches: [{ pageX: 250, pageY: 320 }] });
      fireEvent.touchMove(el!, { touches: [{ pageX: 270, pageY: 350 }] });
      await waitFor(() => {
        expect(mockOnChange).toBeCalled();
      });
    });
  });
});
