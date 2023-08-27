import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Helmet, useOutlet, useSiteData } from 'dumi';
import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useLocale, useLocation, useSiteToken, useThemeConfig } from '../../../hooks';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../slots/Header';

import { SiteContext } from '.dumi/theme/slots/SiteContext';
import '../../static/style';
import ResourceLayout from '../ResourceLayout';
import SidebarLayout from '../SidebarLayout';

const locales = {
  cn: {
    title: 'Zarm Design - 众安科技移动端组件库',
    description: '众安科技移动端组件库',
  },
  en: {
    title: 'Zarm Design - A mobile UI library by Zhongan Technology',
    description: 'A mobile UI library by Zhongan Technology',
  },
};

const DocLayout: React.FC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const { pathname, hash } = location;
  const [locale, lang] = useLocale(locales);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { direction } = useContext(SiteContext);
  const { loading } = useSiteData();
  const theme = useSiteToken();
  const themeConfig = useThemeConfig();

  useLayoutEffect(() => {
    if (lang === 'cn') {
      dayjs.locale('zh-cn');
    } else {
      dayjs.locale('en');
    }
  }, []);

  // useEffect(() => {
  //   const nprogressHiddenStyle = document.getElementById('nprogress-style');
  //   if (nprogressHiddenStyle) {
  //     timerRef.current = setTimeout(() => {
  //       nprogressHiddenStyle.parentNode?.removeChild(nprogressHiddenStyle);
  //     }, 0);
  //   }
  // }, []);

  // handle hash change or visit page hash from Link component, and jump after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');
    if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView();
  }, [loading, hash]);

  const content = useMemo(() => {
    if (
      ['', '/'].some((path) => path === pathname) ||
      ['/index'].some((path) => pathname.startsWith(path))
    ) {
      return outlet;
    }
    if (pathname.startsWith('/resource')) {
      return <ResourceLayout>{outlet}</ResourceLayout>;
    }
    return <SidebarLayout>{outlet}</SidebarLayout>;
  }, [pathname, outlet]);

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html
          lang={lang}
          data-direction={direction}
          className={classNames({ rtl: direction === 'rtl' })}
        />
        <title>{locale?.title}</title>
        {themeConfig.icon && <link sizes="144x144" href={themeConfig.icon} />}
        <meta name="description" content={locale.description} />
        <meta property="og:title" content={locale?.title} />
        <meta property="og:description" content={locale.description} />
        <meta property="og:type" content="website" />
        {themeConfig.icon && <meta property="og:image" content={themeConfig.icon} />}
      </Helmet>
      <GlobalStyles />
      <ConfigProvider direction={direction} locale={lang === 'cn' ? zhCN : undefined} theme={theme}>
        <Header />
        {content}
      </ConfigProvider>
    </>
  );
};

export default DocLayout;
