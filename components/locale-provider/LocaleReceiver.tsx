import React from 'react';
import { LocaleContext } from './';
import hoistNonReactStatic from 'hoist-non-react-statics';

const LocaleReceiverWrapper = (WrappedComponent, name?) => {
  const LocaleReceiver: any = props => {
    const component = locale => {
      const componentLocale =
        locale && locale[name || WrappedComponent.name];
      const localeCode = locale && locale.locale;

      return (
        <WrappedComponent
          {...props}
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
  hoistNonReactStatic(LocaleReceiver, WrappedComponent);
  return LocaleReceiver;
};

export default LocaleReceiverWrapper;
