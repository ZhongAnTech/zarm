import { useSiteData } from 'dumi';

export const useThemeConfig = () => {
  const { themeConfig } = useSiteData();
  return themeConfig;
};
