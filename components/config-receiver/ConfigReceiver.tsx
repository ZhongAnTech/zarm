import React, { Context } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { ConfigContext, LocaleContext } from '../config-provider/ConfigProvider';
import defaultLocaleData from '../config-provider/locale/zh_CN';

const defaultConfigData = {
  locale: defaultLocaleData,
};

type GetContextInnerType<T extends Context<any>> = T extends Context<infer R> ? R : never;
type nameType = keyof Omit<GetContextInnerType<typeof LocaleContext>, 'locale'>;

type ComponentType = new (...args: any[]) => any;

const ConfigReceiverWrapper = (name?: nameType, defaultConfig?: typeof defaultConfigData) => {
  return function InnerWrapper<T extends ComponentType>(WrappedComponent: T) {
    const ConfigReceiver = (props: any) => {
      return (
        <ConfigContext.Consumer>
          {
            ({ locale }) => {
              const globalLocale = (locale.locale) ? locale : (defaultConfig?.locale || defaultConfigData?.locale);
              const componentLocale = globalLocale[name || WrappedComponent.name as nameType];
              const localeCode = globalLocale.locale;
              const { forwardedRef, ...rest } = props;

              return (
                <WrappedComponent
                  {...rest}
                  ref={forwardedRef}
                  locale={componentLocale}
                  localeCode={localeCode}
                />
              );
            }
          }
        </ConfigContext.Consumer>
      );
    };
    const forwardRef = (props: InstanceType<T>['props'], ref: React.Ref<InstanceType<T>>) => {
      return <ConfigReceiver {...props} forwardedRef={ref} />;
    };
    const ConfigReceiverWithRef = React.forwardRef<InstanceType<T>, InstanceType<T>['props']>(forwardRef);
    hoistNonReactStatic(ConfigReceiverWithRef, WrappedComponent);
    return ConfigReceiverWithRef as (T & typeof ConfigReceiverWithRef);
  };
};

export default ConfigReceiverWrapper;
