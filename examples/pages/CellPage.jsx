import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, Cell } from '../../components';

const img = require('../images/icons/state.png');

class Page extends Component {

  render() {
    return (
      <Container className="cell-page">
        <Header title="列表项 Cell" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>普通列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="标题文字" />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带描述的列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="标题文字" description="描述文字" />
              <Cell title="标题文字" description={<Icon type="right" />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带图标、描述的列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="标题文字1" description="描述文字" icon={<Icon type="right" />} />
              <Cell title="标题文字" description="描述文字" icon={<img alt="" src={img} />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带跳转的列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="标题文字" onClick={() => {}} />
              <Cell title="标题文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带描述、箭头、跳转的列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
              <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>带图标、描述、箭头、跳转的列表项</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="标题文字" description="描述文字" icon={<Icon type="right" />} onClick={() => {}} />
              <Cell hasArrow title="标题文字" description="描述文字" icon={<img alt="" src={img} />} onClick={() => {}} />
              <Cell
                hasArrow
                title={
                  <div>
                    <div>标题文字</div>
                    <div style={{ fontSize: 12, color: 'gray' }}>描述文字</div>
                  </div>
                }
                description="附加提示"
                icon={<img alt="" src={img} />}
                onClick={() => {}}
                />
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
