import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Message, Icon, NoticeBar } from '../../components';
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
              <Message theme="error" mode="closable" icon={<Icon type="wrong-round" />}>error</Message>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>通告栏</Panel.Title>
            </Panel.Header>
            <div>
              <NoticeBar mode="link">带图标，带链接样式</NoticeBar>
              <NoticeBar mode="closable">带图标1，带关闭按钮带图标2，带关闭按钮带图标3，带关闭按钮带图标4，带关闭按钮带图标5，带关闭按钮6</NoticeBar>
            </div>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
