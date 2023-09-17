import { css } from '@emotion/react';
import { useOutlet } from 'dumi';
import React from 'react';
import { Reset } from './Reset';

const useStyle = () => ({
  demo: css``,
});

const DemoLayout: React.FC = () => {
  const { demo } = useStyle();
  const outlet = useOutlet();
  return (
    <div css={demo}>
      <Reset />
      {outlet}
    </div>
  );
};

export default DemoLayout;
