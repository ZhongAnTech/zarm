import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Message, Icon } from '../../components';
import '../styles/pages/MessagePage';

class Page extends Component {

  render() {
    return (
      <Container className="message-page">
        <Header title="消息 Message" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Message>普通</Message>
              <Message theme="error">自定义主题</Message>
              <Message icon={<Icon type="wrong-round" />}>自定义图标</Message>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="可操作" />
            <Panel.Body>
              <Message hasArrow onClick={() => alert('click this message!')}>链接样式的</Message>
              <Message hasClosable>可关闭的</Message>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
