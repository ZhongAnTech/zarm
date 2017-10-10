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
    return (
      <Container className="tab-page">
        <Header title="标签页 Tab" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Tab onChange={(i) => { console.log(i); }}>
                <Tab.Panel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Tab.Panel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="可滑动" />
            <Panel.Body>
              <Tab canSwipe onChange={(i) => { console.log(i); }}>
                <Tab.Panel title="选项卡1">
                  <div className="content">试试点我左滑</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡2">
                  <div className="content">试试点我右滑</div>
                </Tab.Panel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="指定默认选项" />
            <Panel.Body>
              <Tab defaultValue={1}>
                <Tab.Panel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Tab.Panel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="指定线条宽度" />
            <Panel.Body>
              <Tab lineWidth={60}>
                <Tab.Panel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡2">
                  <div className="content">选项卡2内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Tab.Panel>
              </Tab>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="禁用指定选项" />
            <Panel.Body>
              <Tab>
                <Tab.Panel title="选项卡1">
                  <div className="content">选项卡1内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡2" disabled>
                  <div className="content">选项卡2内容</div>
                </Tab.Panel>
                <Tab.Panel title="选项卡3">
                  <div className="content">选项卡3内容</div>
                </Tab.Panel>
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
