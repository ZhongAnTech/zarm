import * as React from 'react';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../../../tests/utils';
import WaterMark from '../index';

describe('WaterMark', () => {
  it('renders correctly', () => {
    const wrapper = render(<WaterMark />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('mounted watermark', async () => {
    let onloadRef: Function | undefined;

    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload;
      },
      set(onload: Function) {
        onloadRef = onload;
        this._onload = onload;
      },
    });

    const watermark = mount(<WaterMark text="众安科技" />);

    await waitForComponentToPaint(watermark, 100);

    watermark.update();
    act(() => {
      onloadRef?.();
    });
    expect(watermark).toMatchSnapshot();
    watermark.unmount();
  });

  it('canvas non-supported', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();
    const createElement = document.createElement.bind(document);

    document.createElement = (tagName: string) => {
      if (tagName === 'canvas') {
        return {
          setAttribute: () => null,
          getContext: () => null,
          measureText: () => ({}),
        };
      }
      return createElement(tagName);
    };

    const watermark = mount(<WaterMark text="众安科技" />);

    await waitForComponentToPaint(watermark, 100);

    watermark.update();
    // @ts-ignore
    expect(console.error.mock.calls).toEqual([['当前环境不支持 Canvas']]);

    watermark.unmount();
    spy.mockRestore();
  });
});
