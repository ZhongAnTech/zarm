import React, { useEffect, useState, createContext } from 'react';
import classnames from 'classnames';
import { Icon, Radio, Popper } from 'zarm';
import { darken } from '@site/utils/color';
import './style.scss';

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

export const Context = createContext({});

const Container = (props) => {
  const [lang, setLang] = useState(window.sessionStorage.language || 'zhCN');
  const [theme, setTheme] = useState(window.sessionStorage.theme || '#00bc70');

  const setCssVar = (color) => {
    document.documentElement.style.setProperty('--theme-primary', color);
    document.documentElement.style.setProperty('--theme-primary-dark', darken(color, 0.04));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCssVar(theme);
  }, [theme]);

  const { className, children } = props;
  const cls = classnames('app-container', className);

  return (
    <div className={cls}>
      <nav>
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
        <Popper
          trigger="click"
          content={(
            <ul className="color-pick-list">
              {
                ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'].map((color, index) => {
                  return (
                    <li
                      key={+index}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setTheme(color);
                        window.sessionStorage.theme = color;
                      }}
                    />
                  );
                })
              }
            </ul>
        )}
        >
          <span className="color-pick" style={{ backgroundColor: theme }} />
        </Popper>
        <a className="github" href="https://github.com/ZhongAnTech/zarm">
          <Icons type="github" size="lg" />
        </a>
      </nav>
      <Context.Provider value={{ lang, theme }}>
        {children}
      </Context.Provider>
    </div>
  );
};

export default Container;
