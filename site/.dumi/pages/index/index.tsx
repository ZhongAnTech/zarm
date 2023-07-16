import { useSiteToken } from '.dumi/hooks';
import { SiteContext } from '.dumi/theme/slots/SiteContext';
import { css } from '@emotion/react';
import { Col, Row } from 'antd';
import * as React from 'react';
import { Banner, Introduce } from './components';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    homepage: css`
      min-height: calc(100vh - 64px);
      align-items: center;
      display: flex;

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
        max-width: 1200px;
        position: relative;
        z-index: 2;
        margin: 0 auto;
        padding: 0 40px;
        height: 100%;
        box-sizing: border-box;

        @media only screen and (max-width: ${token.mobileMaxWidth}px) {
          padding: 0;
        }
      }
    `,
  };
};

const Homepage: React.FC = () => {
  const { homepage } = useStyle();
  const { isMobile } = React.useContext(SiteContext);

  const colProps = isMobile
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        { xxl: 13, xl: 13, lg: 13, md: 13, sm: 24, xs: 24 },
        { xxl: 11, xl: 11, lg: 11, md: 11, sm: 0, xs: 0 },
      ];

  return (
    <div css={homepage}>
      <main>
        <Row style={{ flexFlow: 'nowrap' }}>
          <Col {...colProps[0]}>
            <Introduce />
          </Col>
          <Col {...colProps[1]}>
            <Banner />
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Homepage;
