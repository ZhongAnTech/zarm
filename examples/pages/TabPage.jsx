import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    const TabPanel = Tab.Panel;

    return (
      <Container className="tab-page">
        <Header title="标签页 Tab" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab onChange={(i) => { console.log(i); }}>
                <TabPanel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </TabPanel>
                <TabPanel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>可滑动</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab canSwipe onChange={(i) => { console.log(i); }}>
                <TabPanel title="选项卡1">
                  <div className="content">试试点我左滑</div>
                </TabPanel>
                <TabPanel title="选项卡2">
                  <div className="content">试试点我右滑</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>多主题</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab theme="info">
                <TabPanel title="选项卡1" />
                <TabPanel title="选项卡2" />
                <TabPanel title="选项卡3" />
              </Tab>
              <Tab theme="success">
                <TabPanel title="选项卡1" />
                <TabPanel title="选项卡2" />
                <TabPanel title="选项卡3" />
              </Tab>
              <Tab theme="warning">
                <TabPanel title="选项卡1" />
                <TabPanel title="选项卡2" />
                <TabPanel title="选项卡3" />
              </Tab>
              <Tab theme="error">
                <TabPanel title="选项卡1" />
                <TabPanel title="选项卡2" />
                <TabPanel title="选项卡3" />
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
                <TabPanel title="选项卡1" />
                <TabPanel title="选项卡2" />
                <TabPanel title="选项卡3" />
              </Tab>

              <Tab theme="error" value={this.state.activeIndex} onChange={(i) => console.log(i)}>
                <TabPanel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </TabPanel>
                <TabPanel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </TabPanel>
                <TabPanel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>指定默认选项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab defaultValue={1}>
                <TabPanel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </TabPanel>
                <TabPanel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </TabPanel>
                <TabPanel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>指定线条宽度</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab lineWidth={60}>
                <TabPanel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </TabPanel>
                <TabPanel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </TabPanel>
                <TabPanel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>禁用指定选项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Tab>
                <TabPanel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </TabPanel>
                <TabPanel title="选项卡2" disabled>
                  <div className="content">选项卡2内容</div>
                </TabPanel>
                <TabPanel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </TabPanel>
              </Tab>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default TabPage;
