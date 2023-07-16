import { useLocale, useSiteToken } from '.dumi/hooks';
import { css } from '@emotion/react';
import * as React from 'react';
import { Navigation } from './Navigation';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    introduce: css`
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      display: flex;
    `,
    title: css`
      font-size: 64px;
      font-weight: bold;
      line-height: 1;
      span {
        color: #00bc70;
      }
    `,
    description: css`
      font-size: 20px;
      line-height: 1.5;
      margin-top: 30px;
    `,
  };
};

const locales = {
  cn: {
    description: '追求极致的用户体验，做有温度的组件库',
    start: '开始使用',
    scanCode: '扫码体验',
  },
  en: {
    description: 'Pursue the ultimate user experience and build a component library with warmth',
    start: 'Getting Started',
    scanCode: 'Scan QR Code',
  },
};

export const Introduce: React.FC = () => {
  const { introduce, title, description } = useStyle();
  const [locale] = useLocale(locales);

  return (
    <div css={introduce}>
      <div css={title}>
        <span>Zarm</span> Design
      </div>
      <div css={description}>{locale.description}</div>
      <Navigation />
    </div>
  );
};
