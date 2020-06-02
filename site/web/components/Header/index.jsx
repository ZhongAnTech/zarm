import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// import { Select } from 'dragon-ui';
import { Icon, Badge } from 'zarm';
import classnames from 'classnames';
import docsearch from 'docsearch.js';
import Events from '@site/utils/events';
import { version } from '@/package.json';
import 'docsearch.js/dist/cdn/docsearch.min.css';
import './style.scss';

const initDocSearch = () => {
  docsearch({
    apiKey: '44e980b50447a3a5fac9dc2a4808c439',
    indexName: 'zarm',
    inputSelector: '.search input',
    debug: false,
  });
};

const Header = () => {
  const searchInput = useRef();
  const location = useLocation();

  const keyupEvent = (event) => {
    if (event.keyCode === 83 && event.target === document.body) {
      searchInput.current.focus();
    }
  };

  const activeClassName = (keys) => {
    return classnames({
      active: keys.indexOf(location.pathname.split('/')[1] || '/') > -1,
    });
  };

  useEffect(() => {
    initDocSearch();
    Events.on(document, 'keyup', keyupEvent);

    return () => {
      Events.off(document, 'keyup', keyupEvent);
    };
  }, []);

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <a href="#/">
            <img alt="logo" src={require('./images/logo.svg')} />
            Zarm
            <sup className="logo-version">v{version}</sup>
          </a>
        </div>
        <nav>
          <div className="search">
            <Icon type="search" />
            <input placeholder="搜索组件..." ref={searchInput} />
          </div>
          <ul>
            <li><a href="#/components/quick-start" className={activeClassName(['components'])}>组件</a></li>
            <li><a href="#/design/download" className={activeClassName(['design'])}>资源</a></li>
            {document.location.host.indexOf('gitee') < 0 && <li><a href="https://zarm.gitee.io">国内镜像</a></li>}
          </ul>
          {/* <div className="version">
            <Select
              radius
              defaultValue={version}
            >
              <Select.Option value={version}>{version}</Select.Option>
            </Select>
          </div> */}
          <div>
            <a className="github" href="https://github.com/ZhongAnTech/zarm" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" version="1.1" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
