import React, { forwardRef, RefForwardingComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LocaleContext } from './LocaleProvider';
import defaultLocaleData from './locale/en_US';

type nameType = keyof (typeof defaultLocaleData);

// eslint-disable-next-line
const LocaleReceiverWrapper = <T extends { new(...args: any[]): any }>(WrappedComponent: T, name?: nameType) => {
  const LocaleReceiver = (props) => {
    const component = (locale) => {
      const globalLocale = (locale.locale) ? locale : defaultLocaleData;
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
    };

    return (
      <LocaleContext.Consumer>
        {component}
      </LocaleContext.Consumer>
    );
  };

  const forwardRefFactory = (props: InstanceType<T>['props'], ref: React.Ref<InstanceType<T>>) => {
    return <LocaleReceiver {...props} forwardedRef={ref} />;
  };

  const LocaleReceiverWithRef = forwardRef<InstanceType<T>, InstanceType<T>['props']>(
    forwardRefFactory as RefForwardingComponent<any, any>,
  );
  hoistNonReactStatic(LocaleReceiverWithRef, WrappedComponent);
  return LocaleReceiverWithRef;
};

export default LocaleReceiverWrapper;
