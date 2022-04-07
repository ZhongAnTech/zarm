import Color from 'color';
import type { ConfigProviderProps } from './interface';

const setPrimaryColor = (color: ConfigProviderProps['primaryColor']) => {
  document.documentElement.style.setProperty('--theme-primary', color!);
  document.documentElement.style.setProperty(
    '--theme-primary-dark',
    Color(color).darken(0.05).string(),
  );
  document.documentElement.style.setProperty(
    '--theme-primary-lighter',
    Color(color).lightness(95).string(),
  );
  document.documentElement.style.setProperty(
    '--za-button-primary-shadow-color',
    Color(color).alpha(0.3).string(),
  );

  document.documentElement.style.setProperty('--za-theme-primary', color!);
  document.documentElement.style.setProperty(
    '--za-theme-primary-dark',
    Color(color).darken(0.05).string(),
  );
  document.documentElement.style.setProperty(
    '--za-theme-primary-lighter',
    Color(color).lightness(95).string(),
  );
};

export default setPrimaryColor;
