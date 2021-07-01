import React, { Context, ComponentType } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { ConfigContext, LocaleContext } from '../config-provider/ConfigProvider';
import defaultLocaleData from '../config-provider/locale/zh_CN';

const defaultConfigData = {
  locale: defaultLocaleData,
};

type GetContextInnerType<T extends Context<any>> = T extends Context<infer R> ? R : never;
type nameType = keyof Omit<GetContextInnerType<typeof LocaleContext>, 'locale'>;

const ConfigReceiverWrapper = (name?: nameType, defaultConfig?: typeof defaultConfigData) => {
  return function InnerWrapper<T extends {}>(WrappedComponent: ComponentType<T>) {
    const ConfigReceiver = <P extends { forwardedRef: React.Ref<T> }>(props: P) => {
      return (
        <ConfigContext.Consumer>
          {({ locale, safeIphoneX }) => {
            const globalLocale = locale.locale
              ? locale
              : defaultConfig?.locale || defaultConfigData?.locale;
            const componentLocale = globalLocale[name || (WrappedComponent.name as nameType)];
            const localeCode = globalLocale.locale;
            const { forwardedRef, ...rest } = props;

            return (
              <WrappedComponent
                {...(rest as T & P)}
                ref={forwardedRef}
                locale={componentLocale}
                localeCode={localeCode}
                safeIphoneX={safeIphoneX}
              />
            );
          }}
        </ConfigContext.Consumer>
      );
    };
    const forwardRef = (props: T, ref: React.Ref<T>) => {
      return <ConfigReceiver {...props} forwardedRef={ref} />;
    };
    const ConfigReceiverWithRef = React.forwardRef(forwardRef);
    hoistNonReactStatic(ConfigReceiverWithRef, WrappedComponent);
    return ConfigReceiverWithRef as T & typeof ConfigReceiverWithRef;
  };
};

export default ConfigReceiverWrapper;
