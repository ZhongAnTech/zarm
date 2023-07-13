import type { ThemeName } from '.dumi/theme/types';
import type { DirectionType } from 'antd/es/config-provider';
import * as React from 'react';

export interface SiteContextProps {
  isMobile: boolean;
  direction: DirectionType;
  theme: ThemeName[];
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;
}

export const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  direction: 'ltr',
  theme: ['light'],
  updateSiteConfig: () => {},
});
