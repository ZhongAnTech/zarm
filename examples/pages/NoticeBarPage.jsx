import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon, NoticeBar } from '../../components';
import '../styles/pages/NoticeBarPage';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <Container className="noticebar-page">
        <Header title="通告栏 NoticeBar" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <div>
              <NoticeBar hasArrow onClick={() => alert('click this notice!')}>带图标，带右侧箭头的链接样式</NoticeBar>
              <NoticeBar hasClosable theme="error" icon={<Icon type="wrong-round" />}>自定义icon，自定义主题，显示关闭按钮。</NoticeBar>
              <NoticeBar autoscroll>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
            </div>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
