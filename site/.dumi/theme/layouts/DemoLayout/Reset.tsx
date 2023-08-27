import { useSiteToken } from '.dumi/hooks';
import { Global, css } from '@emotion/react';
import * as React from 'react';

export const Reset: React.FC = () => {
  const { token } = useSiteToken();

  return (
    <Global
      styles={css`
        html {
          direction: initial;

          &.rtl {
            direction: rtl;
          }
        }

        body {
          overflow-x: hidden;
          color: ${token.colorText};
          font-size: ${token.fontSize}px;
          font-family: ${token.fontFamily};
          line-height: ${token.lineHeight};
          background: #f2f2f7;
          transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      `}
    />
  );
};
