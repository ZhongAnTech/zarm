import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
import { getLocalizedPathname, isZhCN } from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { useClickAway } from 'ahooks';
import { Link } from 'dumi';
import { QRCodeSVG } from 'qrcode.react';
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
      min-width: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50px;
      background-color: ${token.colorPrimary};
      border: 0;
      color: #fff;
      font-size: 18px;
      border-radius: 25px;
      outline: none;
      padding: 0 30px;
    `,
    ghost: css`
      border: 1px solid #00bc70;
      color: #00bc70;
      background-color: #fff;
    `,
    item: css`
      position: relative;
      margin-bottom: 12px;
      &:first-child {
        margin-right: 16px;
      }
    `,
    qrcode: css`
      width: 120px;
      height: 120px;
      border-radius: 4px;
      padding: 12px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 100%;
      margin-left: -70px;
      transform: scale(0.75);
      transition: 200ms;
      opacity: 0;
      svg {
        display: block;
      }
    `,
    visible: css`
      transform: scale(1);
      opacity: 1;
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
  const { navigation, button, ghost, item, qrcode, visible } = useStyle();
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
      <div css={item}>
        <Link to={getLocalizedPathname('/guide/about-zarm', isZhCN(pathname), search)}>
          <button css={button}>{locale.start}</button>
        </Link>
      </div>
      <div css={item}>
        <button ref={ref} css={[button, ghost]} onClick={() => setOpen(!open)}>
          {locale.scanCode}
        </button>
        <div css={[qrcode, open && visible]}>
          <Link to={galleryPath}>
            <QRCodeSVG value={galleryURL} size={120} />
          </Link>
        </div>
      </div>
    </div>
  );
};
