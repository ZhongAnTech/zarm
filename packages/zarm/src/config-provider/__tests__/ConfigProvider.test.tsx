import { render, RenderOptions, screen } from '@testing-library/react';
import React from 'react';
import Popup from '../../popup';
import ConfigProvider, { ConfigContext, defaultConfig } from '../ConfigProvider';
import type { ConfigProviderProps } from '../interface';

interface CustomRenderOptions extends RenderOptions {
  providerProps: ConfigProviderProps;
}

const customRender = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions,
) => {
  return render(<ConfigProvider {...providerProps}>{ui}</ConfigProvider>, renderOptions);
};

describe('ConfigProvider', () => {
  test('should provide default context config via default props', () => {
    customRender(
      <ConfigContext.Consumer>
        {(value) => (
          <>
            <span data-testid="prefixCls">{value.prefixCls}</span>
            <span data-testid="safeArea">{value.safeArea ? 1 : 0}</span>
          </>
        )}
      </ConfigContext.Consumer>,
      {
        providerProps: {},
      },
    );
    expect(screen.getByTestId('prefixCls').textContent).toEqual(defaultConfig.prefixCls);
    expect(document.body.getAttribute('data-theme')).toEqual(defaultConfig.theme);
    expect(!!+screen.getByTestId('safeArea').textContent!).toEqual(defaultConfig.safeArea);
  });

  test('should custum the value from context provider', () => {
    customRender(
      <ConfigContext.Consumer>
        {(value) => <span>theme: {value.theme}</span>}
      </ConfigContext.Consumer>,
      {
        providerProps: { theme: 'dark' },
      },
    );
    expect(document.body.getAttribute('data-theme')).toEqual('dark');
  });

  test('should not pass style prop to Fragment with default css vars', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      render(
        <ConfigProvider>
          <>
            <span>child</span>
          </>
        </ConfigProvider>,
      );

      expect(
        errorSpy.mock.calls.some((args) =>
          String(args[0]).includes('Invalid prop `style` supplied to `React.Fragment`'),
        ),
      ).toBe(false);
    } finally {
      errorSpy.mockRestore();
    }
  });

  test('should render css vars for Fragment children without invalid Fragment props', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { container } = render(
        <ConfigProvider cssVars={{ '--za-button-background': 'red' }}>
          <>
            <span>child</span>
          </>
        </ConfigProvider>,
      );

      expect(container.querySelector('span')?.style.getPropertyValue('--za-button-background')).toBe(
        'red',
      );
      expect(
        errorSpy.mock.calls.some((args) =>
          String(args[0]).includes('Invalid prop `style` supplied to `React.Fragment`'),
        ),
      ).toBe(false);
    } finally {
      errorSpy.mockRestore();
    }
  });

  test('should render css vars when child component does not forward style', () => {
    const App = () => <div data-testid="app">child</div>;
    const { container } = render(
      <ConfigProvider cssVars={{ '--za-button-background': 'red' }}>
        <App />
      </ConfigProvider>,
    );

    expect(container.firstElementChild?.tagName).toBe('SPAN');
    expect(
      (container.firstElementChild as HTMLElement).style.getPropertyValue(
        '--za-button-background',
      ),
    ).toBe('red');
    expect(screen.getByTestId('app').textContent).toBe('child');
  });

  test('should render css vars for portaled popup content', () => {
    render(
      <ConfigProvider cssVars={{ '--za-popup-mask-zindex': '2000' }}>
        <Popup visible mask={false}>
          <span>popup</span>
        </Popup>
      </ConfigProvider>,
    );

    const popupWrapper = document.body.querySelector('.za-popup__wrapper') as HTMLElement;
    expect(popupWrapper.style.getPropertyValue('--za-popup-mask-zindex')).toBe('2000');
  });

  test('should throw error if children has more than one child', () => {
    expect(() =>
      render(
        <ConfigProvider>
          <span>child 1</span>
          <span>child 2</span>
        </ConfigProvider>,
      ),
    ).toThrow();
  });
});
