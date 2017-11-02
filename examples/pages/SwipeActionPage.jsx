import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, SwipeAction } from '../../components';

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
                  {
                    theme: 'error',
                    text: '右按钮1',
                    onClick: () => console.log('右按钮1'),
                  },
                  {
                    theme: 'success',
                    text: '右按钮2',
                    onClick: () => console.log('右按钮2'),
                  },
                ]}>
                <Cell>左滑看看</Cell>
              </SwipeAction>

              <SwipeAction
                left={[
                  {
                    theme: 'info',
                    text: '左按钮1',
                    onClick: () => console.log('左按钮1'),
                  },
                  {
                    theme: 'warning',
                    text: '左按钮2',
                    onClick: () => console.log('左按钮2'),
                  },
                ]}>
                <Cell>右滑看看</Cell>
              </SwipeAction>

              <SwipeAction
                autoClose
                left={[
                  {
                    theme: 'info',
                    text: '左按钮1',
                    onClick: () => console.log('左按钮1'),
                  },
                  {
                    theme: 'warning',
                    text: '左按钮2',
                    onClick: () => console.log('左按钮2'),
                  },
                ]}
                right={[
                  {
                    theme: 'error',
                    text: '右按钮1',
                    onClick: () => console.log('右按钮1'),
                  },
                  {
                    theme: 'success',
                    text: '右按钮2',
                    onClick: () => console.log('右按钮2'),
                  },
                ]}
                onOpen={() => console.log('open')}
                onClose={() => console.log('close')}>
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
