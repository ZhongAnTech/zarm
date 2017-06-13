import React, { Component } from 'react';
import { Panel, Icon, Button } from '../../components';
import '../styles/pages/ButtonPage';

class ButtonPage extends Component {

  render() {
    return (
      <div className="button-page">

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button theme="info">按钮</Button>
            <Button theme="info" block>块级按钮</Button>
            <Button theme="info" block active>激活状态的按钮</Button>
            <Button theme="info" block disabled>禁用状态的按钮</Button>
            <Button block bordered>幽灵按钮</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮主题</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button>default</Button>
            <Button theme="info">info</Button>
            <Button theme="success">success</Button>
            <Button theme="warning">warning</Button>
            <Button theme="error">error</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>按钮大小</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button theme="info" size="xl">xl</Button>
            <Button theme="info" size="lg">lg</Button>
            <Button theme="info">md</Button>
            <Button theme="info" size="sm">sm</Button>
            <Button theme="info" size="xs">xs</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>圆角、椭圆角、圆形按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button bordered radius>圆角按钮</Button>
            <Button bordered round>椭圆角按钮</Button>
            <Button bordered circle>GO</Button>
            <Button bordered circle icon={<Icon type="right" />} />
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>带icon的按钮</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius bordered icon={<Icon type="right-round" theme="success" />}>正确</Button>
            <Button radius bordered icon={<Icon type="wrong-round" theme="error" />}>错误</Button>
            <Button radius bordered loading>加载中</Button>
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default ButtonPage;