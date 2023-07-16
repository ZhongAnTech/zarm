import {
  BugOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { css } from '@emotion/react';
import getAlphaColor from 'antd/es/theme/util/getAlphaColor';
import { FormattedMessage, Link } from 'dumi';
import RcFooter from 'rc-footer';
import type { FooterColumn } from 'rc-footer/lib/column';
import React, { useContext } from 'react';
import { useLocale, useLocation, useSiteToken } from '../../../hooks';
import { SiteContext } from '../SiteContext';
import AdditionalInfo from './AdditionalInfo';

const locales = {
  cn: {
    owner: '众安·体验设计中心',
  },
  en: {
    owner: 'ZhongAn UX Design',
  },
};

const useStyle = () => {
  const { token } = useSiteToken();
  const { isMobile } = useContext(SiteContext);
  const background = new TinyColor(getAlphaColor('#f0f3fa', '#fff'))
    .onBackground(token.colorBgContainer)
    .toHexString();

  return {
    footer: css`
      color: rgba(255, 255, 255, 0.4);
      background-image: linear-gradient(to right bottom, #12c287 50%, #0db77e 50%);
      box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

      * {
        box-sizing: border-box;
      }

      h2,
      a {
        color: #fff;
      }

      &.rc-footer a:hover {
        color: #fff !important;
        text-decoration: underline;
      }

      .rc-footer-column {
        margin-bottom: ${isMobile ? 60 : 0}px;
        :last-child {
          margin-bottom: ${isMobile ? 20 : 0}px;
        }
      }

      .rc-footer-item-icon {
        top: -1.5px;
      }

      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${token.marginXXL}px;
      }

      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${token.fontSize}px;
        }
      }
    `,
  };
};

const Footer: React.FC = () => {
  const location = useLocation();
  const [locale, lang] = useLocale(locales);
  const style = useStyle();

  const { getLink } = location;

  const getColumns = React.useMemo<FooterColumn[]>(() => {
    const isZhCN = lang === 'cn';

    const col1 = {
      title: <FormattedMessage id="app.footer.resources" />,
      items: [
        {
          title: 'zarm vue',
          url: 'https://vue.zarm.design',
          openExternal: true,
          description: 'Zarm of Vue',
        },
        {
          title: 'zarm web',
          url: 'https://web.zarm.design',
          openExternal: true,
        },
        {
          title: <FormattedMessage id="app.footer.resources" />,
          url: getLink('/resources'),
          LinkComponent: Link,
        },
      ],
    };

    const col2 = {
      title: <FormattedMessage id="app.footer.community" />,
      items: [
        {
          icon: <ZhihuOutlined />,
          title: <FormattedMessage id="app.footer.zhihu" />,
          url: 'https://zhuanlan.zhihu.com/c_135293309',
          openExternal: true,
        },
      ],
    };

    if (isZhCN) {
      col2.items.push({
        icon: <UsergroupAddOutlined />,
        title: <FormattedMessage id="app.footer.work_with_us" />,
        url: 'https://app.mokahr.com/apply/zhongan/320',
        openExternal: true,
      } as unknown as typeof col2['items'][number]);
    }

    const col3 = {
      title: <FormattedMessage id="app.footer.help" />,
      items: [
        {
          icon: <GithubOutlined />,
          title: 'GitHub',
          url: 'https://github.com/ZhongAnTech/zarm',
          openExternal: true,
        },
        {
          icon: <HistoryOutlined />,
          title: <FormattedMessage id="app.footer.change-log" />,
          url: getLink('/guide/changelog'),
          LinkComponent: Link,
        },
        {
          icon: <BugOutlined />,
          title: <FormattedMessage id="app.footer.bug-report" />,
          url: 'https://github.com/ZhongAnTech/zarm/issues/new',
          openExternal: true,
        },
        {
          icon: <MessageOutlined />,
          title: <FormattedMessage id="app.footer.discussions" />,
          url: 'https://gitter.im/ZhonganTech/zarm',
          openExternal: true,
        },
        {
          icon: <IssuesCloseOutlined />,
          title: <FormattedMessage id="app.footer.issues" />,
          url: 'https://github.com/ZhongAnTech/zarm/issues',
          openExternal: true,
        },
      ],
    };

    return [col1, col2, col3];
  }, [lang, location.search]);

  return (
    <>
      <RcFooter columns={getColumns} css={style.footer} />
      <AdditionalInfo />
    </>
  );
};

export default Footer;
