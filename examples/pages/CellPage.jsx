import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, Cell, Message, Input, Slider } from '../../components';
import '../styles/pages/CellPage';

const img = require('../images/icons/state.png');

class Page extends Component {

  render() {
    return (
      <Container className="cell-page">
        <Header title="列表项 Cell" />
        <main>
          <Panel>
            <Panel.Header title="普通" />
            <Panel.Body>
              <Cell title="标题文字" />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带描述" />
            <Panel.Body>
              <Cell title="标题文字" description="描述文字" />
              <Cell title="标题文字" description={<Icon type="right" />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带图标、描述" />
            <Panel.Body>
              <Cell title="标题文字" description="描述文字" icon={<Icon type="right" />} />
              <Cell title="标题文字" description="描述文字" icon={<img alt="" src={img} />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带跳转" />
            <Panel.Body>
              <Cell title="标题文字" onClick={() => {}} />
              <Cell title="标题文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带描述、箭头、跳转" />
            <Panel.Body>
              <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
              <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="带图标、描述、箭头、跳转" />
            <Panel.Body>
              <Cell hasArrow title="标题文字" description="描述文字" icon={<Icon type="right" />} onClick={() => {}} />
              <Cell hasArrow title="标题文字" description="描述文字" icon={<img alt="" src={img} />} onClick={() => {}} />
              <Cell
                hasArrow
                title={
                  <div className="box">
                    <div className="box-title">标题文字</div>
                    <div className="box-description">描述文字</div>
                  </div>
                }
                description="附加提示"
                icon={<img alt="" src={img} />}
                onClick={() => {}}
                />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="提示信息" />
            <Panel.Body>
              <Cell
                title="标题"
                help={<Message theme="error" icon={<Icon type="info-round" />}>标题不能为空</Message>}>
                <Input type="text" placeholder="请输入标题" /></Cell>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
