import { Common, Reset } from '.dumi/theme/common/styles';
import { css } from '@emotion/react';
import * as React from 'react';

const useStyle = () => ({
  gallery: css``,
});

const Gallery: React.FC = () => {
  const { gallery } = useStyle();
  return (
    <div css={gallery}>
      <Common />
      <Reset />
      gallery
    </div>
  );
};

export default Gallery;
