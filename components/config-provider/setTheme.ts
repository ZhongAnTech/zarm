import { Theme } from './PropsType';

const themes = {
  '--theme-primary-lighter': '#303030',
  '--color-text': 'rgba(255, 255, 255, 0.85)',
  '--color-text-inverse': 'rgba(255, 255, 255, 0.8)',
  '--color-text-placeholder': 'rgba(255, 255, 255, 0.3)',
  '--color-text-disabled': '#666',
  '--border-color': '#3a3b3d',
  '--opacity-mask': '0.7',
  '--activity-indicator-path-color': 'var(--border-color)',
  '--action-sheet-background': '#1b1c1e',
  '--action-sheet-active-background': '#363738',
  '--alert-button-background': '#2b2c2d',
  '--alert-button-active-background': '#363738',
  '--button-default-background': '#393939',
  '--button-default-border': 'transparent',
  '--button-default-color': 'rgba(255, 255, 255, 0.85)',
  '--button-default-active-background': 'rgba(255, 255, 255, 0.2)',
  '--button-default-active-border': 'transparent',
  '--button-default-active-color': '#fff',
  '--calendar-background': 'transparent',
  '--calendar-week-bar-background': '#303030',
  '--cell-background': '#222',
  '--cell-background-active': '#363738',
  '--cell-arrow-color': '#666',
  '--cell-arrow-disabled-color': '#333',
  '--checkbox-background': 'transparent',
  '--checkbox-border-color': '#58595d',
  '--checkbox-disabled-background': '#555',
  '--checkbox-disabled-color': 'rgba(255, 255, 255, 0.3)',
  '--collapse-arrow-color': '#666',
  '--collapse-arrow-disabled-color': '#333',
  '--confirm-button-background': '#2b2c2d',
  '--confirm-button-active-background': '#363738',
  '--keyboard-background': '#000',
  '--keyboard-item-background': 'rgba(255, 255, 255, 0.1)',
  '--loading-background': '#2b2c2d',
  '--modal-background': '#2b2c2d',
  '--modal-close-color': 'rgba(255, 255, 255, 0.3)',
  '--modal-close-active-color': 'rgba(255, 255, 255, 0.65)',
  '--nav-bar-color': '#1b1c1e',
  '--panel-body-background': '#1b1c1e',
  '--picker-background': '#000',
  '--picker-header-background': '#1b1c1e',
  '--picker-mask-background-start': 'rgba(0, 0, 0, 0.4)',
  '--picker-mask-background-end': 'rgba(0, 0, 0, 0.8)',
  '--progress-background': 'var(--border-color)',
  '--radio-background': 'transparent',
  '--radio-border-color': '#58595d',
  '--radio-disabled-background': '#555',
  '--radio-disabled-color': 'rgba(255, 255, 255, 0.3)',
  '--search-bar-background': '#1b1c1e',
  '--search-bar-inner-background': '#000',
  '--slider-line-dot-color': 'var(--border-color)',
  '--switch-background': '#38393d',
  '--stack-picker-background': '#000',
  '--stack-picker-shadow': 'none',
  '--stepper-input-background': '#000',
  '--tabbar-background': '#1b1c1e',
  '--toast-background': '#2b2c2d',
  '--tooltip-background': '#5b5c60',
};

const setTheme = (value: Theme) => {
  document.body.setAttribute('data-theme', value);
  Object.keys(themes).forEach((key) => {
    value === 'dark'
      ? document.documentElement.style.setProperty(key, themes[key])
      : document.documentElement.style.removeProperty(key);
  });
};

export default setTheme;
