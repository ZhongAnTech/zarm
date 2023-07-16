import { DEFAULT_THEME_CONFIG } from '.dumi/theme/constants';
import { useSiteData } from 'dumi';
import merge from 'lodash/merge';

export const useThemeConfig = () => {
  const { themeConfig } = useSiteData();

  return merge(DEFAULT_THEME_CONFIG, themeConfig);
};
