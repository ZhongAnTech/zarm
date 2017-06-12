import React, { Component } from 'react';
import { Cell, SwipeAction } from '../../components';

import '../styles/pages/SwipeAction';

class SwipeActionPage extends Component {
  render() {
    return (
      <div className="swipeAction-page">
        <SwipeAction
          right={[
            { text: '右按钮1自定义class',
              onClick: () => console.log('右按钮1'),
              theme: 'error',
              className: 'custom-btn',
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
              theme: 'success',
            },
          ]}
          autoClose
          >
          <Cell>右侧按钮（自动关闭）</Cell>
        </SwipeAction>

        <SwipeAction
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
              theme: 'info',
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
              theme: 'warning',
            },
          ]}>
          <Cell>左侧按钮</Cell>
        </SwipeAction>

        <SwipeAction
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
              theme: 'info',
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
              theme: 'warning',
            },
          ]}
          right={[
            { text: '右按钮1',
              onClick: () => console.log('右按钮1'),
              theme: 'error',
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
              theme: 'success',
            },
          ]}>
          <Cell>双侧按钮</Cell>
        </SwipeAction>
        <br />
        <SwipeAction
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
              theme: 'info',
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
              theme: 'warning',
            },
          ]}>
          <div className="cell">左侧按钮(div)</div>
        </SwipeAction>
      </div>
    );
  }
}

export default SwipeActionPage;
