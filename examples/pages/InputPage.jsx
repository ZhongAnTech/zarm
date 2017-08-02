import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, Input, Cell, Message } from '../../components';

class Page extends Component {

  render() {
    return (
      <Container className="cell-page">
        <Header title="文本框 Input" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>普通</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="单行文本"><Input ref={(ele) => { this.focusInput = ele; }} type="text" placeholder="type is text" /></Cell>
              <Cell title="多行文本"><Input type="textarea" rows="3" placeholder="type is textarea" /></Cell>
              <Cell><a onClick={() => { this.focusInput.input.focus(); }}>click to focus the first input</a></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>高度自适应</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="多行文本"><Input autoHeight type="textarea" rows="3" placeholder="写点啥..." /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>无标签栏</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell><Input type="text" placeholder="标题" /></Cell>
              <Cell><Input autoHeight showLength type="textarea" rows="4" maxLength="200" placeholder="摘要" /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>提示信息</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                title="标题"
                help={
                  <Message theme="error">
                    <Icon type="info-round" />
                    <span style={{ marginLeft: 5 }}>标题不能为空</span>
                  </Message>
                }>
                <Input type="text" placeholder="请输入标题" /></Cell>
              <Cell title="摘要"><Input autoHeight type="textarea" rows="3" placeholder="请输入摘要" /></Cell>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
