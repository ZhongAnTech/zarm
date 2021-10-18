import React from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM } from '../utils/dom';
import Content from './Content';
import { usePortal } from './Portal';
import type { BackToTopProps } from './interface';

export type { BackToTopProps } from './interface';

const BackToTop = (props: BackToTopProps) => {
  const el = usePortal('back-to-top');

  if (!el) return null;

  return createPortal(<Content {...props} />, el);
};

BackToTop.displayName = 'BackToTop';

BackToTop.defaultProps = {
  speed: 100,
  visibleDistance: 400,
  scrollContainer: canUseDOM ? window : undefined,
};

export default BackToTop;
