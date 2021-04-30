import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Icon, Radio, Popper, ConfigProvider } from 'zarm';
import Context from '@/utils/context';
import Events from '@/utils/events';
import enUS from 'zarm/config-provider/locale/en_US';
import zhCN from 'zarm/config-provider/locale/zh_CN';
import './style.scss';

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_uwg522sx17.js');

const Container = (props) => {
  const [locale, setLocale] = useState(window.localStorage.locale || 'zhCN');
  const [primaryColor, setPrimaryColor] = useState(window.localStorage.primaryColor || '#00bc70');
  const [theme, setTheme] = useState(window.localStorage.theme || 'light');

  const { className, children } = props;
  const cls = classnames('app-container', className);

  const currentLocale = locale === 'enUS' ? enUS : zhCN;

  useEffect(() => {
    window.scrollTo(0, 0);

    Events.on(window, 'message', ({ data }) => {
      if (data.locale) {
        setLocale(data.locale);
      }
    });
  }, [primaryColor, theme]);

  return (
    <ConfigProvider theme={theme} primaryColor={primaryColor} locale={currentLocale}>
      <div className={cls}>
        <nav>
          <Popper
            trigger="click"
            content={
              <div className="setting-container">
                <ul className="colors">
                  {[
                    '#00bc70',
                    '#1890ff',
                    '#f5222d',
                    '#fa541b',
                    '#13c2c2',
                    '#2f54ec',
                    '#712fd1',
                  ].map((color, index) => {
                    return (
                      <li
                        key={+index}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setPrimaryColor(color);
                          window.localStorage.primaryColor = color;
                        }}
                      />
                    );
                  })}
                </ul>
                <div className="themes">
                  <Radio.Group
                    compact
                    type="button"
                    value={theme}
                    onChange={(value) => {
                      setTheme(value);
                      window.localStorage.theme = value;
                    }}
                  >
                    <Radio value="light">默认主题</Radio>
                    <Radio value="dark">暗黑主题</Radio>
                  </Radio.Group>
                </div>
              </div>
            }
          >
            <span className="setting" />
          </Popper>
          {window.frames.length === window.parent.frames.length && (
            <>
              <div className="lang">
                <Radio.Group
                  compact
                  type="button"
                  value={locale}
                  onChange={(value) => {
                    setLocale(value);
                    window.localStorage.locale = value;
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
          )}
        </nav>
        <Context.Provider value={{ locale, primaryColor, theme }}>{children}</Context.Provider>
      </div>
    </ConfigProvider>
  );
};

export default Container;
