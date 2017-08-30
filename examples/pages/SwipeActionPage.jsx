import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, SwipeAction, Drag } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offsetLeft: 0,
    };
  }

  render() {
    const { offsetLeft } = this.state;
    const style = {
      WebkitTransitionDuration: 0,
      transitionDuration: 0,
      WebkitTransform: `translate3d(${offsetLeft}px, 0, 0)`,
      transform: `translate3d(${offsetLeft}px, 0, 0)`,
    };

    return (
      <Container className="swipeAction-page">
        <Header title="滑动操作 SwipeAction" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
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
                ]}>
                <Cell>左右都能滑动（自动关闭）</Cell>
              </SwipeAction>

              <Drag
                onDragStart={() => {

                }}
                onDragMove={({ translateX, offsetX, distanceX }) => {
                  // console.log(offsetX, distanceX, translateX)
                  if (offsetX > 0 && distanceX > 100) return false;
                  if (translateX > 100) return false;

                  this.setState({ offsetLeft: translateX + offsetX });
                  return true;
                }}
                onDragEnd={() => {

                }}>
                <Cell style={style}>Drag</Cell>
              </Drag>

            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
