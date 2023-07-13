// import Content from '.dumi/theme/slots/Content';
import Sidebar from '.dumi/theme/slots/Sidebar';
import { css } from '@emotion/react';
import { Helmet } from 'dumi';
import type { PropsWithChildren } from 'react';
import React from 'react';

const useStyle = () => ({
  main: css`
    display: flex;
    margin-top: 40px;
  `,
});

const SidebarLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { main } = useStyle();
  return (
    <main css={main}>
      <Helmet />
      <Sidebar />
      {/* <Content>{children}</Content> */}
      {children}
    </main>
  );
};

export default SidebarLayout;
