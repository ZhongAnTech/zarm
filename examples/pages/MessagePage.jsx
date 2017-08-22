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
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Message>primary</Message>
              <Message theme="info" icon={<Icon type="info-round" />}>info</Message>
              <Message theme="success" icon={<Icon type="right-round" />}>success</Message>
              <Message theme="warning" icon={<Icon type="warning-round" />}>warning</Message>
              <Message theme="error" icon={<Icon type="wrong-round" />}>error</Message>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>可操作</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Message hasArrow theme="warning" onClick={() => alert('click this message!')}>链接样式的</Message>
              <Message hasClosable theme="error">可关闭的</Message>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
