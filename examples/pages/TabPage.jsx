import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Tab } from '../../components';
import '../styles/pages/TabPage';

class TabPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const { Item } = Tab;

    return (
      <div className="tab-page">
        <Header title="标签页 Tab" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab onChange={(i) => { console.log(i); }}>
                <Item title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Item>
                <Item title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Item>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>多主题</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab theme="success">
                <Item title="选项卡1" />
                <Item title="选项卡2" />
                <Item title="选项卡3" />
              </Tab>
              <Tab theme="warning">
                <Item title="选项卡1" />
                <Item title="选项卡2" />
                <Item title="选项卡3" />
              </Tab>
              <Tab theme="error">
                <Item title="选项卡1" />
                <Item title="选项卡2" />
                <Item title="选项卡3" />
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>联动</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab
                lineWidth="auto"
                onChange={(i) => {
                  this.setState({
                    activeIndex: i,
                  });
                }}>
                <Item title="选项卡1" />
                <Item title="选项卡2" />
                <Item title="选项卡3" />
              </Tab>

              <Tab theme="error" value={this.state.activeIndex} onChange={(i) => console.log(i)}>
                <Item title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Item>
                <Item title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Item>
                <Item title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Item>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>指定默认选项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab defaultValue={1}>
                <Item title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Item>
                <Item title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Item>
                <Item title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Item>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>指定线条宽度</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab lineWidth={60}>
                <Item title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Item>
                <Item title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Item>
                <Item title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Item>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>禁用指定选项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab>
                <Item title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Item>
                <Item title="选项卡2" disabled>
                  <div className="content">选项卡2内容</div>
                </Item>
                <Item title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Item>
              </Tab>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default TabPage;
