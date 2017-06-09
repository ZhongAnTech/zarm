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
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
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
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
            },
          ]}>
          <Cell title="左侧按钮" />
        </SwipeAction>

        <SwipeAction
          prefixCls="ui-swipeAction"
          left={[
            { text: '左按钮1',
              onClick: () => console.log('左按钮1'),
            },
            { text: '左按钮2',
              onClick: () => console.log('左按钮2'),
            },
          ]}
          right={[
            { text: '右按钮1',
              onClick: () => console.log('右按钮1'),
            },
            { text: '右按钮2',
              onClick: () => console.log('右按钮2'),
            },
          ]}>
          <Cell title="双侧按钮" />
        </SwipeAction>
      </div>
    );
  }
}

export default SwipeActionPage;
