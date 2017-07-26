import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Icon, Button } from '../../components';
import '../styles/pages/ButtonPage';

class Page extends Component {

  render() {
    return (
      <div className="button-page">
        <Header title="按钮 Button" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button theme="primary">普通按钮</Button>
              <Button theme="primary" block>块级按钮</Button>
              <Button theme="primary" block active>激活状态的按钮</Button>
              <Button theme="primary" block disabled>禁用状态的按钮</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>幽灵按钮</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button block bordered>幽灵按钮</Button>
              <Button block bordered active>激活状态的按钮</Button>
              <Button block bordered disabled>禁用状态的按钮</Button>
              <Button theme="primary" block bordered>幽灵按钮</Button>
              <Button theme="primary" block bordered active>激活状态的按钮</Button>
              <Button theme="primary" block bordered disabled>禁用状态的按钮</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>多主题</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button>default</Button>
              <Button theme="primary">primary</Button>
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
              <Button theme="primary" size="xl">xl</Button>
              <Button theme="primary" size="lg">lg</Button>
              <Button theme="primary">md</Button>
              <Button theme="primary" size="sm">sm</Button>
              <Button theme="primary" size="xs">xs</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>圆角、椭圆角、圆形按钮</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button bordered shape="radius">圆角按钮</Button>
              <Button bordered shape="round">椭圆角按钮</Button>
              <Button bordered shape="circle">GO</Button>
              <Button bordered shape="circle" icon={<Icon type="right" />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带icon的按钮</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button bordered shape="radius" icon={<Icon type="right-round" theme="success" />}>正确</Button>
              <Button bordered shape="radius" icon={<Icon type="wrong-round" theme="error" />}>错误</Button>
              <Button bordered loading shape="radius">加载中</Button>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
