import React from 'react';
import { Context } from 'create-react-context';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LocaleContext } from '../locale-provider/LocaleProvider';
import defaultLocaleData from '../locale-provider/locale/zh_CN';

type GetContextInnerType<T extends Context<any>> = T extends Context<infer R> ? R : never;
type nameType = keyof Omit<GetContextInnerType<typeof LocaleContext>, 'locale'>;

type ComponentType = new (...args: any[]) => any;

const LocaleReceiverWrapper = (name?: nameType, defaultLocale?: typeof defaultLocaleData) => {
  return function InnerWrapper<T extends ComponentType>(WrappedComponent: T) {
    const LocaleReceiver = (props: any) => {
      return (
        <LocaleContext.Consumer>
          {
            (locale) => {
              const globalLocale = (locale.locale) ? locale : (defaultLocale || defaultLocaleData);
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
        </LocaleContext.Consumer>
      );
    };
    const forwardRef = (props: InstanceType<T>['props'], ref: React.Ref<InstanceType<T>>) => {
      return <LocaleReceiver {...props} forwardedRef={ref} />;
    };
    const LocaleReceiverWithRef = React.forwardRef<InstanceType<T>, InstanceType<T>['props']>(forwardRef);
    hoistNonReactStatic(LocaleReceiverWithRef, WrappedComponent);
    return LocaleReceiverWithRef as (T & typeof LocaleReceiverWithRef);
  };
};

export default LocaleReceiverWrapper;
