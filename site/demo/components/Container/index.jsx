import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Icon, Radio, Popper } from 'zarm';
import { darken } from '@site/utils/color';
import Context from '@site/utils/context';
import Events from '@site/utils/events';
import './style.scss';

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Container = (props) => {
  const [lang, setLang] = useState(window.sessionStorage.language || 'zhCN');
  const [primary, setPrimary] = useState(window.sessionStorage.primary || '#00bc70');

  const setCssVar = (color) => {
    document.documentElement.style.setProperty('--theme-primary', color);
    document.documentElement.style.setProperty('--theme-primary-dark', darken(color, 0.04));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCssVar(primary);

    Events.on(window, 'message', ({ data }) => {
      if (data.lang) {
        setLang(data.lang);
      }
    });
  }, [primary]);

  const { className, children } = props;
  const cls = classnames('app-container', className);

  return (
    <div className={cls}>
      <nav>
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
                        setPrimary(color);
                        setCssVar(color);
                        window.sessionStorage.primary = color;
                      }}
                    />
                  );
                })
              }
            </ul>
        )}
        >
          <span className="color-pick" style={{ backgroundColor: primary }} />
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
