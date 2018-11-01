import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button, Select, Dropdown } from 'dragon-ui';
import QRious from 'qrious';
import { components } from '@site/demos';
import Format from '@site/utils/format';
import './style.scss';

class Header extends PureComponent {
  state = {
    // dropdown: false,
    searchKey: null,
  }

  componentDidMount() {
    const qr = new QRious({
      element: this.qrcode,
      value: 'https://zhongantecheng.github.io/zarm',
    });
  }

  render() {
    const { history } = this.props;
    const { form, feedback, view, navigation } = components;
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
                [...form, ...feedback, ...view, ...navigation].map((component, i) => {
                  return <Select.Option key={+i} value={Format.camel2Dash(component.name)}>{`${component.name} ${component.description}`}</Select.Option>;
                })
              }
            </Select>
          </div>
          {/* <div className="lang">
            <Dropdown
              trigger="hover"
              visible={this.state.dropdown}
              onVisibleChange={(visible) => {
                this.setState({
                  dropdown: visible,
                });
              }}
              overlay={<canvas ref={(ele) => { this.qrcode = ele; }} />}
            >
              <Button theme="info">扫码体验</Button>
            </Dropdown>
            <Button>English</Button>
          </div> */}
          {/* <nav>
            <Menu mode="horizontal" defaultSelectedKeys={['components']}>
              <Menu.Item key="index" onClick={() => history.replace('/')}>首页</Menu.Item>
              <Menu.Item key="components">组件</Menu.Item>
              <Menu.Item key="github" onClick={() => window.open('https://github.com/ZhonganTechENG/zarm')}>github</Menu.Item>
            </Menu>
          </nav> */}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
