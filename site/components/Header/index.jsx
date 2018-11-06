import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Select } from 'dragon-ui';
import classnames from 'classnames';
import { components } from '@site/demos';
import Format from '@site/utils/format';
import './style.scss';

class Header extends PureComponent {
  state = {
    searchKey: null,
  }

  activeClassName = (keys) => {
    const { match } = this.props;
    return classnames({
      active: keys.indexOf(match.url.split('/')[1] || '/') > -1,
    });
  }

  render() {
    const { history, match } = this.props;
    const { form, feedback, view, navigation } = components;
    const { version } = require('@/package.json');

    return (
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="#/">ZARM</a>
          </div>
          <div className="search">
            <Select
              radius
              search
              placeholder="搜索组件..."
              value={this.state.searchKey}
              onChange={(data) => {
                history.replace(`/components/${data.value}`);
                this.setState({
                  searchKey: null,
                });
              }}
            >
              {
                [...form, ...feedback, ...view, ...navigation]
                  .sort((a, b) => {
                    return a.name.localeCompare(b.name);
                  })
                  .map((component, i) => {
                    return <Select.Option key={+i} value={Format.camel2Dash(component.name)}>{`${component.name} ${component.description}`}</Select.Option>;
                  })
              }
            </Select>
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
              { match.url !== '/' && <li><a href="#/">首页</a></li>}
              <li><a href="#/documents/quick-start" className={this.activeClassName(['documents', 'components'])}>文档</a></li>
              <li><a href="https://github.com/ZhonganTechENG/zarm" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
