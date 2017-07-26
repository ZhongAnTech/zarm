import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { Panel, Cell } from '../../components';
import '../styles/pages/IndexPage';

class Page extends PureComponent {

  render() {
    return (
      <div className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Dragon Mobile UI</div>
            <div className="brand-description">众安保险移动端组件库</div>
          </section>
        </header>
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>表单组件</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="复选框 Checkbox" onClick={() => hashHistory.push('/checkbox')} />
              <Cell hasArrow title="文本框 Input" onClick={() => hashHistory.push('/input')} />
              <Cell hasArrow title="选择器 Picker" onClick={() => hashHistory.push('/picker')} />
              <Cell hasArrow title="单选框 Radio" onClick={() => hashHistory.push('/radio')} />
              <Cell hasArrow title="步进器 Stepper" onClick={() => hashHistory.push('/stepper')} />
              <Cell hasArrow title="开关 Switch" onClick={() => hashHistory.push('/switch')} />
              <Cell hasArrow title="上传组件 Uploader" onClick={() => hashHistory.push('/uploader')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>操作反馈</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="动作面板 ActionSheet" onClick={() => hashHistory.push('/actionsheet')} />
              <Cell hasArrow title="按钮 Button" onClick={() => hashHistory.push('/button')} />
              <Cell hasArrow title="模态框 Modal" onClick={() => hashHistory.push('/modal')} />
              <Cell hasArrow title="弹出框 Popup" onClick={() => hashHistory.push('/popup')} />
              <Cell hasArrow title="滑动操作 SwipeAction" onClick={() => hashHistory.push('/swipeAction')} />
              <Cell hasArrow title="轻提示 Toast" onClick={() => hashHistory.push('/toast')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>数据展示</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="徽标 Badge" onClick={() => hashHistory.push('/badge')} />
              <Cell hasArrow title="列表项 Cell" onClick={() => hashHistory.push('/cell')} />
              <Cell hasArrow title="图标 Icon" onClick={() => hashHistory.push('/icon')} />
              <Cell hasArrow title="消息 Message" onClick={() => hashHistory.push('/message')} />
              <Cell hasArrow title="进度条 Progress" onClick={() => hashHistory.push('/progress')} />
              <Cell hasArrow title="指示器 Spinner" onClick={() => hashHistory.push('/spinner')} />
              <Cell hasArrow title="图片轮播 Swipe" onClick={() => hashHistory.push('/swipe')} />
              <Cell hasArrow title="标签页 Tab" onClick={() => hashHistory.push('/tab')} />
            </Panel.Body>
          </Panel>
          {
            // <Panel>
            //   <Panel.Header>
            //     <Panel.Title>基础组件</Panel.Title>
            //   </Panel.Header>
            //   <Panel.Body>
            //     <Cell hasArrow title="大转盘 Lottery" onClick={() => hashHistory.push('/lottery')} />
            //   </Panel.Body>
            // </Panel>
          }
        </main>
      </div>
    );
  }
}

export default Page;
