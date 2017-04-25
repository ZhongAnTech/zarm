
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Panel, Icon, Button } from '../../components';

import '../styles/pages/ButtonPage';

class ButtonPage extends Component {

  render() {
    return (
      <div className="button-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>按钮主题</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button>按钮</Button>
            <Button theme="brand">按钮</Button>
            <Button theme="success">按钮</Button>
            <Button theme="warning">按钮</Button>
            <Button theme="error">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>幽灵按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius bordered>按钮</Button>
            <Button radius bordered theme="brand">按钮</Button>
            <Button radius bordered theme="success">按钮</Button>
            <Button radius bordered theme="warning">按钮</Button>
            <Button radius bordered theme="error">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>禁用状态的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius disabled>按钮</Button>
            <Button radius disabled theme="brand">按钮</Button>
            <Button radius disabled bordered>按钮</Button>
            <Button radius disabled bordered theme="brand">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮大小</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button size="xl">按钮</Button>
            <Button size="lg" theme="brand">按钮</Button>
            <Button theme="success">按钮</Button>
            <Button size="sm" theme="warning">按钮</Button>
            <Button size="xs" theme="error">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>块级按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button block radius theme="brand">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>圆角、椭圆角、圆形按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius>圆角按钮</Button>
            <Button round theme="brand">椭圆角按钮</Button>
            <Button circle bordered><Icon type="right" /></Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带icon的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius bordered>
              <Icon type="right-round" theme="success" />
              <span>正确</span>
            </Button>
            <Button radius bordered>
              <Icon type="wrong-round" theme="error" />
              <span>错误</span>
            </Button>
            <Button radius disabled bordered loading>加载中的按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>激活状态的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius active>按钮</Button>
            <Button radius active theme="brand">按钮</Button>
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default ButtonPage;