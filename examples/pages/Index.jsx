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
              <Panel.Title>基础组件</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell type="link" title="图标 Icon" onClick={() => hashHistory.push('/icon')} />
              <Cell type="link" title="按钮 Button" onClick={() => hashHistory.push('/button')} />
              {
                // <Cell type="link" title="大转盘 Lottery" onClick={() => hashHistory.push('/lottery')} />
              }
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>表单组件</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell type="link" title="单选框 Radio" onClick={() => hashHistory.push('/radio')} />
              <Cell type="link" title="开关 Switch" onClick={() => hashHistory.push('/switch')} />
              <Cell type="link" title="选择器 Picker" onClick={() => hashHistory.push('/picker')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>操作反馈</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell type="link" title="模态框 Modal" onClick={() => hashHistory.push('/modal')} />
              <Cell type="link" title="轻提示 Toast" onClick={() => hashHistory.push('/toast')} />
              <Cell type="link" title="滑动操作 SwipeAction" onClick={() => hashHistory.push('/swipeAction')} />
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Header>
              <Panel.Title>数据展示</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell type="link" title="标签页 Tab" onClick={() => hashHistory.push('/tab')} />
              <Cell type="link" title="列表项 Cell" onClick={() => hashHistory.push('/cell')} />
              <Cell type="link" title="图片轮播 Swipe" onClick={() => hashHistory.push('/swipe')} />
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
