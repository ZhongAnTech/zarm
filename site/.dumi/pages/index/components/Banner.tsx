import { css } from '@emotion/react';
import * as React from 'react';

const useStyle = () => ({
  banner: css`
    height: 100%;
    display: flex;
    align-items: center;
    img {
      margin-top: 80px;
      width: 100%;
      animation: banner-move 60s infinite;
    }

    @keyframes banner-move {
      0% {
        transform: translate3d(0, 0, 0);
      }

      20% {
        transform: translate3d(-30px, -30px, 0);
      }

      40% {
        transform: translate3d(30px, -30px, 0);
      }

      60% {
        transform: translate3d(-30px, 30px, 0);
      }

      80% {
        transform: translate3d(30px, 30px, 0);
      }

      100% {
        transform: translate3d(0, 0, 0);
      }
    }
  `,
});

export const Banner: React.FC = () => {
  const { banner } = useStyle();
  return (
    <div css={banner}>
      <img src="https://zarm.design/images/banner@2x.27b77fc0.png" />
    </div>
  );
};
