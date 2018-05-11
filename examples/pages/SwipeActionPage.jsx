import React, { Component } from 'react';
import { Panel, Cell, SwipeAction, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {
  render() {
    return (
      <Container className="swipeAction-page">
        <Header title="滑动操作 SwipeAction" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <SwipeAction
                right={[
                  <Button theme="primary" onClick={() => console.log('右按钮1')}>右按钮1</Button>,
                  <Button theme="error" onClick={() => console.log('右按钮2')}>右按钮2</Button>,
                ]}
              >
                <Cell>左滑看看</Cell>
              </SwipeAction>

              <SwipeAction
                left={[
                  <Button theme="primary" onClick={() => console.log('左按钮1')}>左按钮1</Button>,
                  <Button theme="error" onClick={() => console.log('左按钮2')}>左按钮2</Button>,
                ]}
              >
                <Cell>右滑看看</Cell>
              </SwipeAction>

              <SwipeAction
                autoClose
                left={[
                  <Button theme="primary" onClick={() => console.log('左按钮1')}>左按钮1</Button>,
                  <Button theme="warning" onClick={() => console.log('左按钮2')}>左按钮2</Button>,
                ]}
                right={[
                  <Button theme="error" onClick={() => console.log('右按钮1')}>右按钮2</Button>,
                ]}
                onOpen={() => console.log('open')}
                onClose={() => console.log('close')}
              >
                <Cell>左右都能滑动（自动关闭）</Cell>
              </SwipeAction>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
