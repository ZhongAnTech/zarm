import { useSiteToken } from '.dumi/hooks';
import { css, Global } from '@emotion/react';
import * as React from 'react';

export const NProgress: React.FC = () => {
  const { token } = useSiteToken();
  return (
    <Global
      styles={css`
        #nprogress {
          .bar {
            background: ${token.colorPrimary};
          }

          .peg {
            box-shadow: 0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary};
          }

          .spinner-icon {
            border-top-color: ${token.colorPrimary};
            border-left-color: ${token.colorPrimary};
          }
        }
      `}
    />
  );
};
