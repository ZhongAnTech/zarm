import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { useClickAway } from 'ahooks';
import { Button, Popover, QRCode, Space } from 'antd';
import { Link } from 'dumi';
import * as React from 'react';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    navigation: css`
      margin-top: 100px;
      margin-bottom: 60px;
      flex-wrap: wrap;
      display: flex;
    `,
    button: css`
      &${token.antCls}-btn {
        height: 48px;
      }
    `,
  };
};

const locales = {
  cn: {
    start: '开始使用',
    scanCode: '扫码体验',
  },
  en: {
    start: 'Getting Started',
    scanCode: 'Scan QR Code',
  },
};

export const Navigation: React.FC = () => {
  const { navigation, button } = useStyle();
  const [locale, lang] = useLocale(locales);
  const { pathname, search, getLink } = useLocation();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const [galleryURL, setGalleryURL] = React.useState('');
  const isZhCN = lang === 'cn';

  useClickAway(() => {
    open && setOpen(false);
  }, ref);

  const galleryPath = getLocalizedPathname('gallery', true).pathname;

  return (
    <div css={navigation}>
      <Space size="large">
        <Link to={getLocalizedPathname('/guide/quick-start', isZhCN, search)}>
          <Button css={button} type="primary" size="large" shape="round">
            {locale.start}
          </Button>
        </Link>
        <Popover
          overlayInnerStyle={{ padding: 0 }}
          placement="bottom"
          content={
            <Link to={galleryPath}>
              <QRCode value={galleryURL} bordered={false} />
            </Link>
          }
          afterOpenChange={(open) => {
            if (!open) return;
            const url = location.origin + galleryPath;
            if (url === galleryURL) return;
            setGalleryURL(url);
          }}
        >
          <Button css={button} type="primary" size="large" shape="round" ghost>
            {locale.scanCode}
          </Button>
        </Popover>
      </Space>
    </div>
  );
};
