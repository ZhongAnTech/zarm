import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, FakeInput, Button } from '../../components';

import '../styles/pages/KeyboardPage';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyboard: false,
    };
  }

  render() {
    return (
      <Container className="keyboard-page">
        <Header title="模拟输入框+数字键盘" />
        <main>
          <Panel>
            <Panel.Header title="手机号" />
            <Panel.Body>
              手机：<FakeInput placeholder="请输入手机号"/>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="金额" />
            <Panel.Body>
              金额：<FakeInput placeholder="请输入金额"/>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="身份证" />
            <Panel.Body>
              身份证：<FakeInput placeholder="请输入身份证"/>
            </Panel.Body>
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
