
import React, { Component } from 'react';
import { Panel, Icon, Tab, Button } from '../../components';

import '../styles/pages/TabPage';

class TabPage extends Component {

  render() {
    return (
      <div className="tab-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>标签页</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Tab.Group onChange={(i) => console.log(i)}>
              <Tab title="选项卡1">
                这是选项卡1的文字
              </Tab>
              <Tab title="选项卡2">
                这是选项卡2的文字
              </Tab>
            </Tab.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>标签页主题</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Tab.Group theme="success" onChange={(i) => console.log(i)}>
              <Tab title="选项卡1"></Tab>
              <Tab title="选项卡2"></Tab>
              <Tab title="选项卡3"></Tab>
            </Tab.Group>

            <Tab.Group theme="info" onChange={(i) => console.log(i)}>
              <Tab title="选项卡1"></Tab>
              <Tab title="选项卡2"></Tab>
              <Tab title="选项卡3"></Tab>
            </Tab.Group>

            <Tab.Group theme="warning" onChange={(i) => console.log(i)}>
              <Tab title="选项卡1"></Tab>
              <Tab title="选项卡2"></Tab>
              <Tab title="选项卡3"></Tab>
            </Tab.Group>

            <Tab.Group theme="error" onChange={(i) => console.log(i)}>
              <Tab title="选项卡1"></Tab>
              <Tab title="选项卡2"></Tab>
              <Tab title="选项卡3"></Tab>
            </Tab.Group>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>默认选项的标签页</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Tab.Group theme="success" defaultValue={1} onChange={(i) => console.log(i)}>
              <Tab title="选项卡1"></Tab>
              <Tab title="选项卡2"></Tab>
              <Tab title="选项卡3"></Tab>
            </Tab.Group>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default TabPage;