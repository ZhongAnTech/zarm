import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
import { getLocalizedPathname, isZhCN as isZhCNPath } from '.dumi/theme/utils';
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
  const [locale] = useLocale(locales);
  const { pathname, search, getLink, ...rest } = useLocation();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    open && setOpen(false);
  }, ref);

  const galleryPath = getLocalizedPathname('gallery').pathname;
  const galleryURL = location.origin + galleryPath;

  return (
    <div css={navigation}>
      <Space size="large">
        <Link to={getLocalizedPathname('/guide/quick-start', isZhCNPath(pathname), search)}>
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
        >
          <Button css={button} type="primary" size="large" shape="round" ghost>
            {locale.scanCode}
          </Button>
        </Popover>
      </Space>
    </div>
  );
};
