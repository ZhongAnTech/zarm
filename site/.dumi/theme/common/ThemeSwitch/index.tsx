import { FloatButton } from 'antd';
import { DarkTheme } from 'antd-token-previewer/es/icons';
import { FormattedMessage } from 'dumi';
import React from 'react';

import ThemeIcon from './ThemeIcon';

export type ThemeName = 'light' | 'dark';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props) => {
  const { value = ['light'], onChange } = props;

  return (
    <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
      <FloatButton
        icon={<DarkTheme />}
        type={value.includes('dark') ? 'primary' : 'default'}
        onClick={() => {
          if (value.includes('dark')) {
            onChange(value.filter((theme) => theme !== 'dark'));
          } else {
            onChange([...value, 'dark']);
          }
        }}
        tooltip={<FormattedMessage id="app.theme.switch.dark" />}
      />
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
