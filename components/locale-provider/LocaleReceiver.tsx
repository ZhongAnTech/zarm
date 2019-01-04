import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LocaleContext } from './LocaleProvider';
import defaultLocaleData from './locale/en_US';

const LocaleReceiverWrapper = (WrappedComponent, name?) => {
  const LocaleReceiver: any = props => {
    const component = locale => {
      const globalLocale = (locale.locale) ? locale : defaultLocaleData;
      const componentLocale = globalLocale[name || WrappedComponent.name];
      const localeCode = globalLocale.locale;

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
