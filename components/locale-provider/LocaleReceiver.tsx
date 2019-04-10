import React, { forwardRef, RefForwardingComponent } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LocaleContext } from './LocaleProvider';
import defaultLocaleData from './locale/en_US';

const LocaleReceiverWrapper = (WrappedComponent, name?) => {
  const LocaleReceiver: any = props => {
    const component = locale => {
      const globalLocale = (locale.locale) ? locale : defaultLocaleData;
      const componentLocale = globalLocale[name || WrappedComponent.name];
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

  const forwardRefFactory = (props, ref) => {
    return <LocaleReceiver {...props} forwardedRef={ref} />;
  };

  const LocaleReceiverWithRef = forwardRef(forwardRefFactory as RefForwardingComponent<any, any>);
  hoistNonReactStatic(LocaleReceiver, WrappedComponent);
  return LocaleReceiverWithRef;
};

export default LocaleReceiverWrapper;
