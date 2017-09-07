import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, NoticeBar } from '../../components';
import '../styles/pages/NoticeBarPage';

class Page extends Component {

  render() {
    return (
      <Container className="noticebar-page">
        <Header title="通告栏 NoticeBar" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <div>
              <NoticeBar>普通</NoticeBar>
              <NoticeBar theme="error">错误色</NoticeBar>
              <NoticeBar icon={<Icon type="wrong-round" />}>自定义图标</NoticeBar>
              <NoticeBar autoscroll>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
            </div>
          </Panel>

          <Panel>
            <Panel.Header title="可操作" />
            <div>
              <NoticeBar hasArrow onClick={() => alert('click this notice!')}>链接样式的</NoticeBar>
              <NoticeBar hasClosable>可关闭的</NoticeBar>
            </div>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
