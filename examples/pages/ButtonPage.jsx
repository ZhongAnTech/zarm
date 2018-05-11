import React, { Component } from 'react';
import { Panel, Icon, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
              <Button>default</Button>
              <Button theme="primary">primary</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="块级按钮" />
            <Panel.Body>
              <Button block>default</Button>
              <Button block disabled>disabled default</Button>
              <Button block theme="primary">primary</Button>
              <Button block disabled theme="primary">disabled primary</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="幽灵按钮" />
            <Panel.Body>
              <Button block bordered>default</Button>
              <Button block bordered disabled>disabled default</Button>
              <Button block bordered theme="primary">primary</Button>
              <Button block bordered disabled theme="primary">disabled primary</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="主题" />
            <Panel.Body>
              <Button theme="default">default</Button>
              <Button theme="primary">primary</Button>
              <Button theme="success">success</Button>
              <Button theme="warning">warning</Button>
              <Button theme="error">error</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="大小" />
            <Panel.Body>
              <Button theme="primary" size="lg">lg</Button>
              <Button theme="primary">md</Button>
              <Button theme="primary" size="sm">sm</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="形状" />
            <Panel.Body>
              <Button shape="radius" theme="primary">圆角按钮</Button>
              <Button shape="round" theme="primary">椭圆角按钮</Button>
              <Button bordered shape="circle" theme="primary">GO</Button>
              <Button shape="circle" icon={<Icon type="right" />} />
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
