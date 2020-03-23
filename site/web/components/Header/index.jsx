import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Select } from 'dragon-ui';
import classnames from 'classnames';
import docsearch from 'docsearch.js';
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

class Header extends PureComponent {
  componentDidMount() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 83 && event.target === document.body) {
        this.searchInput.focus();
      }
    });
    initDocSearch();
  }

  activeClassName = (keys) => {
    const { match } = this.props;
    return classnames({
      active: keys.indexOf(match.url.split('/')[1] || '/') > -1,
    });
  };

  render() {
    const { match } = this.props;

    return (
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="#/">
              <img alt="logo" src={require('./images/logo.svg')} />
              Zarm
            </a>
          </div>
          <div className="search">
            <input placeholder="搜索组件..." ref={(ref) => { this.searchInput = ref; }} />
          </div>
          <div className="version">
            <Select
              radius
              defaultValue={version}
            >
              <Select.Option value={version}>{version}</Select.Option>
            </Select>
          </div>
          <nav>
            <ul>
              {match.url !== '/' && <li><a href="#/">首页</a></li>}
              <li><a href="#/components/quick-start" className={this.activeClassName(['components'])}>React 组件</a></li>
              <li><a href="https://ZhongAnTech.github.io/zarm-vue/#/documents/quick-start">Vue 组件</a></li>
              <li><a href="#/design/download" className={this.activeClassName(['design'])}>设计</a></li>
              <li><a href="https://github.com/ZhongAnTech/zarm" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
