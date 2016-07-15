
import React, { Component } from 'react';
import { Panel, Icon, Button } from '../../components';

import '../styles/pages/ButtonPage';

class ButtonPage extends Component {

  render() {
    return (
      <div className="button-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>普通按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button>按钮</Button>
            <Button theme="info">按钮</Button>
            <Button theme="success">按钮</Button>
            <Button theme="warning">按钮</Button>
            <Button theme="error">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮大小</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button size="xl">按钮</Button>
            <Button theme="info" size="lg">按钮</Button>
            <Button theme="success">按钮</Button>
            <Button theme="warning" size="sm">按钮</Button>
            <Button theme="error" size="xs">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>幽灵按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button bordered>按钮</Button>
            <Button bordered theme="info">按钮</Button>
            <Button bordered theme="success">按钮</Button>
            <Button bordered theme="warning">按钮</Button>
            <Button bordered theme="error">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>块级按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button block theme="info">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>圆角、椭圆角、圆形按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius>圆角按钮</Button>
            <Button round theme="info">椭圆角按钮</Button>
            <Button circle theme="error"><Icon type="close" /></Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带icon的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius theme="success"><Icon type="check-round" />正确</Button>
            <Button radius theme="error"><Icon type="close-round" />错误</Button>
            <Button radius disabled loading>加载中的按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>禁用状态的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button disabled>按钮</Button>
            <Button disabled theme="info">按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>激活状态的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button active>按钮</Button>
            <Button active theme="info">按钮</Button>
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default ButtonPage;