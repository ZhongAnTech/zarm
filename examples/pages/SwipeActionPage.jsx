import React, { Component } from 'react';
import { Panel, Cell, SwipeAction } from '../../components';

import '../styles/pages/SwipeAction';

class SwipeActionPage extends Component {
  render() {
    return (
      <div className="swipeAction-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>普通列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <SwipeAction
              right={[
                {
                  className: 'custom-btn',
                  theme: 'error',
                  text: '右按钮1自定义class',
                  onClick: () => console.log('右按钮1'),
                },
                {
                  theme: 'success',
                  text: '右按钮2',
                  onClick: () => console.log('右按钮2'),
                },
              ]}
              autoClose>
              <Cell>右侧按钮（自动关闭）</Cell>
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
              <Cell>左侧按钮</Cell>
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
              <Cell>双侧按钮</Cell>
            </SwipeAction>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>普通列表项</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <SwipeAction
              right={[
                {
                  text: '右按钮1',
                  onClick: () => console.log('右按钮1'),
                  theme: 'info',
                },
                {
                  text: '右按钮2',
                  onClick: () => console.log('右按钮2'),
                  theme: 'warning',
                },
              ]}>
              <div className="cell">右侧按钮(div)</div>
            </SwipeAction>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default SwipeActionPage;
