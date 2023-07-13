import { useLocale, useLocation, useSiteToken, useThemeConfig } from '.dumi/hooks';
import { useSiteContext } from '.dumi/hooks/useSiteContext';
import { GlobalStyles } from '.dumi/theme/components';
import Header from '.dumi/theme/slots/Header';
import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { Helmet, useOutlet, useSiteData } from 'dumi';
import * as React from 'react';
import SidebarLayout from '../SidebarLayout';
// import Footer from '../../slots/Footer';

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
  const { pathname, search, hash } = location;
  const { loading } = useSiteData();
  const [locale, lang] = useLocale(locales);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const { logo } = useThemeConfig();
  const { direction } = useSiteContext();
  const { token } = useSiteToken();

  React.useLayoutEffect(() => {
    if (lang === 'cn') {
      dayjs.locale('zh-cn');
    } else {
      dayjs.locale('en');
    }
  }, []);

  React.useEffect(() => {
    const nprogressHiddenStyle = document.getElementById('nprogress-style');
    if (nprogressHiddenStyle) {
      timerRef.current = setTimeout(() => {
        nprogressHiddenStyle.parentNode?.removeChild(nprogressHiddenStyle);
      }, 0);
    }
  }, []);

  React.useEffect(() => {
    const id = hash.replace('#', '');
    if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView();
  }, [loading, hash]);

  const content = React.useMemo(() => {
    if (
      ['', '/'].some((path) => path === pathname) ||
      ['/index'].some((path) => pathname.startsWith(path))
    ) {
      return <>{outlet}</>;
    }
    return <SidebarLayout>{outlet}</SidebarLayout>;
  }, [pathname, outlet]);

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html lang={lang} />
        <title>{locale?.title}</title>
        {logo && <link sizes="144x144" href={logo} />}
        <meta name="description" content={locale.description} />
        <meta property="og:title" content={locale?.title} />
        <meta property="og:description" content={locale.description} />
        <meta property="og:type" content="website" />
        {logo && <meta property="og:image" content={logo} />}
      </Helmet>
      <ConfigProvider
        direction={direction}
        locale={lang === 'cn' ? zhCN : undefined}
        theme={{ token }}
      >
        <GlobalStyles />
        <Header />
        {content}
      </ConfigProvider>
    </>
  );
};

export default DocLayout;
