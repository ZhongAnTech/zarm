import type { Theme } from './PropsType';

export const themes = {
  '--theme-primary-lighter': '#303030',
  '--color-text': 'rgba(255, 255, 255, 0.85)',
  '--color-text-inverse': 'rgba(255, 255, 255, 0.8)',
  '--color-text-placeholder': 'rgba(255, 255, 255, 0.3)',
  '--color-text-disabled': '#666',
  '--border-color': '#3a3b3d',
  '--opacity-mask': '0.7',
  '--calendar-background': 'transparent',
  '--calendar-week-background': '#303030',
  '--picker-background': '#000',
  '--picker-header-background': '#1b1c1e',
  '--picker-mask-background-start': 'rgba(0, 0, 0, 0.4)',
  '--picker-mask-background-end': 'rgba(0, 0, 0, 0.8)',
  '--stack-picker-background': '#000',
  '--stack-picker-shadow': 'none',
} as const;

const setTheme = (value: Theme) => {
  document.body.setAttribute('data-theme', value);
  Object.keys(themes).forEach((key) => {
    value === 'dark'
      ? document.documentElement.style.setProperty(key, themes[key])
      : document.documentElement.style.removeProperty(key);
  });
};

export default setTheme;
