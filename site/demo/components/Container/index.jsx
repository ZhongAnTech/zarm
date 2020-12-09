import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Icon, Radio, Popper } from 'zarm';
import Color from 'color';
import Context from '@site/utils/context';
import Events from '@site/utils/events';
import setDarkTheme from './dark';
import './style.scss';

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Container = (props) => {
  const [lang, setLang] = useState(window.sessionStorage.language || 'zhCN');
  const [primary, setPrimary] = useState(window.sessionStorage.primary || '#00bc70');
  const [theme, setTheme] = useState(window.sessionStorage.theme || 'light');

  const setPrimaryColor = (color) => {
    document.documentElement.style.setProperty('--theme-primary', color);
    document.documentElement.style.setProperty('--theme-primary-dark', Color(color).darken(0.05));
    document.documentElement.style.setProperty('--button-primary-shadow-color', Color(color).alpha(0.5).lighten(0.0));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setPrimaryColor(primary);
    setDarkTheme(theme);

    Events.on(window, 'message', ({ data }) => {
      if (data.lang) {
        setLang(data.lang);
      }
    });
  }, [primary, theme]);

  const { className, children } = props;
  const cls = classnames('app-container', className);

  return (
    <div className={cls}>
      <nav>
        <Popper
          trigger="click"
          content={(
            <div className="setting-container">
              <ul className="colors">
                {
                  ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'].map((color, index) => {
                    return (
                      <li
                        key={+index}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setPrimary(color);
                          setPrimaryColor(color);
                          window.sessionStorage.primary = color;
                        }}
                      />
                    );
                  })
                }
              </ul>
              <div className="themes">
                <Radio.Group
                  compact
                  type="button"
                  value={theme}
                  onChange={(value) => {
                    setTheme(value);
                    setDarkTheme(value);
                    window.sessionStorage.theme = value;
                  }}
                >
                  <Radio value="light">默认主题</Radio>
                  <Radio value="dark">暗黑主题</Radio>
                </Radio.Group>
              </div>
            </div>
          )}
        >
          <span className="setting" style={{ backgroundColor: primary }} />
        </Popper>
        {
          window.frames.length === window.parent.frames.length && (
            <>
              <div className="lang">
                <Radio.Group
                  compact
                  type="button"
                  value={lang}
                  onChange={(value) => {
                    setLang(value);
                    window.sessionStorage.language = value;
                  }}
                >
                  <Radio value="zhCN">中文</Radio>
                  <Radio value="enUS">EN</Radio>
                </Radio.Group>
              </div>
              <a className="github" href="https://github.com/ZhongAnTech/zarm">
                <Icons type="github" size="lg" />
              </a>
            </>
          )
        }
      </nav>
      <Context.Provider value={{ lang, primary }}>
        {children}
      </Context.Provider>
    </div>
  );
};

export default Container;
