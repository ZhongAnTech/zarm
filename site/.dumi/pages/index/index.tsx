import { css } from '@emotion/react';
import * as React from 'react';
import { Banner, Introduce } from './components';

const useStyle = () => ({
  homepage: css`
    &::before {
      content: '';
      background-color: #fff;
      background: url('https://zarm.design/images/bg@2x.db553f72.png') top right no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
    }
    main {
      position: relative;
      z-index: 2;
      max-width: 1200px;
      margin: 0 auto;
      padding: 120px 24px;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      display: flex;
    }
  `,
});

const Homepage: React.FC = () => {
  const { homepage } = useStyle();
  return (
    <div css={homepage}>
      <main>
        <Introduce />
        <Banner />
      </main>
    </div>
  );
};

export default Homepage;
