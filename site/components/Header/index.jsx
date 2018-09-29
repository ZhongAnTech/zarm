import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button, Select, Dropdown } from 'dragon-ui';
import { components } from '@site/demos';
import Format from '@site/utils/format';
import './Header.scss';

class Header extends PureComponent {
  state = {
    dropdown: false,
  }

  render() {
    const { history } = this.props;
    const { form, feedback, view, navigation } = components;
    return (
      <header>
        <div className="logo">
          <a href="#/">Zarm</a>
        </div>
        <div className="search">
          <Select
            radius
            search
            style={{ width: 200 }}
            placeholder="搜索组件..."
            onChange={(data) => {
              history.replace(`/docs/${data.value}`);
            }}
          >
            {
              [...form, ...feedback, ...view, ...navigation].map((component, i) => {
                return <Select.Option key={+i} value={Format.camel2Dash(component.name)}>{component.name} {component.description}</Select.Option>;
              })
            }
          </Select>
        </div>
        <div className="lang">
          <Dropdown
            trigger="hover"
            visible={this.state.dropdown}
            style={{ position: 'absolute', left: 0, top: 36, minWidth: 200 }}
            onVisibleChange={(visible) => {
              this.setState({
                dropdown: visible,
              });
            }}
            overlay={
              <div className="qrcode">
                111
              </div>
            }
          >
            <Button theme="info">扫码体验</Button>
          </Dropdown>
          <Button>English</Button>
        </div>
        <nav>
          <Menu mode="horizontal" defaultSelectedKeys={['components']}>
            <Menu.Item key="index" onClick={() => history.replace('/')}>首页</Menu.Item>
            <Menu.Item key="components">组件</Menu.Item>
            <Menu.Item key="github" onClick={() => window.open('https://github.com/ZhonganTechENG/zarm')}>github</Menu.Item>
          </Menu>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
