import React, { Component } from 'react';
import { Cell, SwipeAction } from '../../components';

import '../styles/pages/SwipeAction';

class SwipeActionPage extends Component {
  render() {
    return (
      <div className="swipeAction-page">
        <SwipeAction
          prefixCls="ui-swipeAction"
          right={[
            { text: '右按钮1',
              onClick: () => console.log('右按钮1'),
              style: { backgroundColor: 'orange', color: 'white' },
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
              style: { backgroundColor: 'red', color: 'white' },
            },
          ]}
          autoClose
          >
          <Cell title="右侧按钮（自动关闭）" />
        </SwipeAction>

        <SwipeAction
          prefixCls="ui-swipeAction"
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
              style: { backgroundColor: 'orange', color: 'white' },
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
              style: { backgroundColor: 'red', color: 'white' },
            },
          ]}>
          <Cell title="左侧按钮" />
        </SwipeAction>

        <SwipeAction
          prefixCls="ui-swipeAction"
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
              style: { backgroundColor: 'orange', color: 'white' },
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
              style: { backgroundColor: 'red', color: 'white' },
            },
          ]}
          right={[
            { text: '右按钮1',
              onClick: () => console.log('右按钮1'),
              style: { backgroundColor: 'orange', color: 'white' },
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
              style: { backgroundColor: 'red', color: 'white' },
            },
          ]}>
          <Cell title="双侧按钮" />
        </SwipeAction>
      </div>
    );
  }
}

export default SwipeActionPage;
