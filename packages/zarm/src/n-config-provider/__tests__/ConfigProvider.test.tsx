import React from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
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
        {(value) => {
          return (
            <>
              <span data-testid="theme">{value.theme}</span>
              <span data-testid="primaryColor">{value.primaryColor}</span>
              <span data-testid="safeIphoneX">{value.safeIphoneX ? 1 : 0}</span>
              <span data-testid="prefixCls">{value.prefixCls}</span>
            </>
          );
        }}
      </ConfigContext.Consumer>,
      {
        providerProps: {},
      },
    );
    // expect(screen.getByTestId('theme').textContent).toEqual(ConfigProvider.defaultProps.theme);
    // expect(screen.getByTestId('primaryColor').textContent).toEqual(
    //   ConfigProvider.defaultProps.primaryColor,
    // );
    expect(!!+screen.getByTestId('safeIphoneX').textContent!).toEqual(
      ConfigProvider.defaultProps.safeIphoneX,
    );
    expect(screen.getByTestId('prefixCls').textContent).toEqual(
      ConfigProvider.defaultProps.prefixCls,
    );
  });

  // test('should custum the value from context provider', () => {
  //   customRender(
  //     <ConfigContext.Consumer>
  //       {(value) => <span>theme: {value.theme}</span>}
  //     </ConfigContext.Consumer>,
  //     {
  //       providerProps: { theme: 'dark' },
  //     },
  //   );
  //   expect(screen.getByText(/^theme:/).textContent).toBe('theme: dark');
  // });

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
