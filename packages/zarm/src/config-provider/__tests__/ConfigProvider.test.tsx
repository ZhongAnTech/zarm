import { render, RenderOptions, screen } from '@testing-library/react';
import React from 'react';
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

  test('should throw error if children has more than one child', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => 'silence');
    expect(() =>
      render(
        <ConfigProvider>
          <span>child 1</span>
          <span>child 2</span>
        </ConfigProvider>,
      ),
    ).toThrow();
    expect(errorSpy).toBeCalled();
  });
});
