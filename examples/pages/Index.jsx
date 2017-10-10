import React, { PureComponent } from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import { Panel, Cell } from '../../components';
import '../styles/pages/IndexPage';

class Page extends PureComponent {

  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm UI</div>
            <div className="brand-description">众安科技移动端组件库</div>
          </section>
        </header>
        <main>
          <Panel>
            <Panel.Header title="表单组件" />
            <Panel.Body>
              <Cell hasArrow title="复选框 Checkbox" onClick={() => history.push('/checkbox')} />
              <Cell hasArrow title="文本框 Input" onClick={() => history.push('/input')} />
              <Cell hasArrow title="选择器 Picker" onClick={() => history.push('/picker')} />
              <Cell hasArrow title="单选框 Radio" onClick={() => history.push('/radio')} />
              <Cell hasArrow title="滑动输入条 Slider" onClick={() => history.push('/slider')} />
              <Cell hasArrow title="步进器 Stepper" onClick={() => history.push('/stepper')} />
              <Cell hasArrow title="开关 Switch" onClick={() => history.push('/switch')} />
              <Cell hasArrow title="上传组件 Uploader" onClick={() => history.push('/uploader')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="操作反馈" />
            <Panel.Body>
              <Cell hasArrow title="动作面板 ActionSheet" onClick={() => history.push('/action-sheet')} />
              <Cell hasArrow title="按钮 Button" onClick={() => history.push('/button')} />
              <Cell hasArrow title="模态框 Modal" onClick={() => history.push('/modal')} />
              <Cell hasArrow title="弹出框 Popup" onClick={() => history.push('/popup')} />
              <Cell hasArrow title="上拉加载下拉刷新 Pull" onClick={() => history.push('/pull')} />
              <Cell hasArrow title="滑动操作 SwipeAction" onClick={() => history.push('/swipe-action')} />
              <Cell hasArrow title="轻提示 Toast" onClick={() => history.push('/toast')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header title="数据展示" />
            <Panel.Body>
              <Cell hasArrow title="徽标 Badge" onClick={() => history.push('/badge')} />
              <Cell hasArrow title="列表项 Cell" onClick={() => history.push('/cell')} />
              <Cell hasArrow title="图标 Icon" onClick={() => history.push('/icon')} />
              <Cell hasArrow title="消息 Message" onClick={() => history.push('/message')} />
              <Cell hasArrow title="通告栏 NoticeBar" onClick={() => history.push('/notice-bar')} />
              <Cell hasArrow title="面板 Panel" onClick={() => history.push('/panel')} />
              <Cell hasArrow title="进度条 Progress" onClick={() => history.push('/progress')} />
              <Cell hasArrow title="指示器 Spinner" onClick={() => history.push('/spinner')} />
              <Cell hasArrow title="图片轮播 Swipe" onClick={() => history.push('/swipe')} />
              <Cell hasArrow title="标签页 Tab" onClick={() => history.push('/tab')} />
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
