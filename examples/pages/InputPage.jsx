import React, { Component } from 'react';
import { Panel, Input, Cell } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  render() {
    return (
      <Container className="input-page">
        <Header title="文本框 Input" />
        <main>
          <Panel>
            <Panel.Header title="普通" />
            <Panel.Body>
              <Cell title="单行文本"><Input type="text" placeholder="请输入" /></Cell>
              <Cell title="多行文本"><Input type="textarea" rows={3} placeholder="请输入" /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="输入类型" />
            <Panel.Body>
              <Cell title="数字"><Input type="number" placeholder="type is number" focused={this.state.focused} onFocus={value => console.log(`onFocus: ${value}`)} onBlur={value => console.log(`onBlur: ${value}`)} /></Cell>
              <Cell title="金额"><Input type="price" placeholder="type is price" /></Cell>
              <Cell title="身份证"><Input type="idcard" placeholder="type is idcard" /></Cell>
              <Cell><a onClick={() => {
                this.setState({
                  focused: true,
                });
              }}>click to focus the first input</a></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="高度自适应" />
            <Panel.Body>
              <Cell title="多行文本"><Input autoHeight type="textarea" rows={3} placeholder="写点啥..." /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="无标签栏" />
            <Panel.Body>
              <Cell><Input type="text" placeholder="标题" /></Cell>
              <Cell><Input autoHeight type="textarea" rows={4} maxLength={200} placeholder="摘要" /></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="显示输入字数" />
            <Panel.Body>
              <Cell><Input autoHeight showLength type="textarea" rows={4} maxLength={200} placeholder="摘要" /></Cell>
            </Panel.Body>
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
