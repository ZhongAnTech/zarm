import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Input, Cell } from '../../components';

class Page extends Component {

  render() {
    return (
      <Container className="input-page">
        <Header title="文本框 Input" />
        <main>
          <Panel>
            <Panel.Header title="普通" />
            <Panel.Body>
              <Cell title="单行文本"><Input ref={(ele) => { this.focusInput = ele; }} type="text" placeholder="请输入" /></Cell>
              <Cell title="多行文本"><Input type="textarea" rows={3} placeholder="请输入" /></Cell>
              <Cell><a onClick={() => { this.focusInput.input.input.focus(); }}>click to focus the first input</a></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="高度自适应" />
            <Panel.Body>
              <Cell title="多行文本"><Input autosize type="textarea" rows={3} placeholder="写点啥..." /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="无标签栏" />
            <Panel.Body>
              <Cell><Input type="text" placeholder="标题" /></Cell>
              <Cell><Input autosize type="textarea" rows={4} maxLength={200} placeholder="摘要" /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="显示输入字数" />
            <Panel.Body>
              <Cell><Input autosize showLength type="textarea" rows={4} maxLength={200} placeholder="摘要" /></Cell>
            </Panel.Body>
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
