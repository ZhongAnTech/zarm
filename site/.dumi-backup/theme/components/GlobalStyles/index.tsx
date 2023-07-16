import * as React from 'react';
import { Common, HeadingAnchor, Highlight, Markdown, NProgress, Reset } from './styles';

export const GlobalStyles: React.FC = () => {
  return (
    <>
      <Reset />
      <Common />
      <Markdown />
      <HeadingAnchor />
      <Highlight />
      <NProgress />
    </>
  );
};
