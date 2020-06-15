import React, { useContext } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Context from '@site/utils/context';
import Locale from '@site/locale';
import './style.scss';

const Footer = () => {
  const { lang } = useContext(Context);

  return (
    <IntlProvider locale="zh-CN" messages={Locale[lang]}>
      <footer>
        <div className="copyright">
          <FormattedMessage id="app.demo.footer.copyright" />
        </div>
      </footer>
    </IntlProvider>
  );
};

export default Footer;
