import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, Button } from '../../components';

import '../styles/pages/ButtonPage';

class Page extends Component {

  render() {
    return (
      <Container className="button-page">
        <Header title="按钮 Button" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Button theme="primary">普通按钮</Button>
              <Button theme="primary" block>块级按钮</Button>
              <Button theme="primary" block active>激活状态的按钮</Button>
              <Button theme="primary" block disabled>禁用状态的按钮</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="幽灵按钮" />
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
            <Panel.Header title="主题" />
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
            <Panel.Header title="大小" />
            <Panel.Body>
              <Button theme="primary" size="xl">xl</Button>
              <Button theme="primary" size="lg">lg</Button>
              <Button theme="primary">md</Button>
              <Button theme="primary" size="sm">sm</Button>
              <Button theme="primary" size="xs">xs</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="形状" />
            <Panel.Body>
              <Button bordered shape="radius">圆角按钮</Button>
              <Button bordered shape="round">椭圆角按钮</Button>
              <Button bordered shape="circle">GO</Button>
              <Button bordered shape="circle" icon={<Icon type="right" />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带Icon" />
            <Panel.Body>
              <Button bordered shape="radius" icon={<Icon type="right-round" theme="success" />}>正确</Button>
              <Button bordered shape="radius" icon={<Icon type="wrong-round" theme="error" />}>错误</Button>
              <Button bordered loading shape="radius">加载中</Button>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
