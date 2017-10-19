import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, FakeInput, NumKeyboard } from '../../components';

import '../styles/pages/NumKeyboardPage';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyboard: false,
      tel: '',
      price: '',
      id: '',
      kbType: 'tel',
    };
    this.keyHandle = this.keyHandle.bind(this);
    this.doneHandle = this.doneHandle.bind(this);
  }

  inputFocus(type) {
    return () => {
      this.setState({
        kbType: type,
        isShowKeyboard: true,
      });
    };
  }

  keyHandle(key) {
    const { kbType } = this.state;
    if (key === '-1') {
      this.setState({
        [kbType]: this.state[kbType].slice(0, -1),
      });
    } else {
      this.setState({
        [kbType]: this.state[kbType] + key,
      });
    }
  }

  doneHandle() {
    this.setState({
      isShowKeyboard: false,
    });
  }

  render() {
    const { tel, price, id, isShowKeyboard, kbType } = this.state;

    return (
      <Container className="numkeyboard-page">
        <Header title="模拟输入框+数字键盘" />
        <main>
          <Panel>
            <Panel.Header title="手机号键盘" />
            <Panel.Body>
              手机：<FakeInput value={tel} placeholder="请输入手机号" cbFocus={this.inputFocus('tel')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="价格键盘" />
            <Panel.Body>
              金额：<FakeInput value={price} placeholder="请输入金额" cbFocus={this.inputFocus('price')} inputStyle={{ color: 'red' }} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="身份证键盘" />
            <Panel.Body>
              身份证：<FakeInput value={id} placeholder="请输入身份证" cbFocus={this.inputFocus('id')} />
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
        <NumKeyboard
          visible={isShowKeyboard}
          type={kbType}
          keyCallback={this.keyHandle}
          doneCallback={this.doneHandle}
          />
      </Container>
    );
  }
}

export default Page;
