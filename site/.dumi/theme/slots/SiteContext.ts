import type { DirectionType } from 'antd/es/config-provider';
import * as React from 'react';
import type { ThemeName } from '../common/ThemeSwitch';

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
