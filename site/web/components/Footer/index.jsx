import React, { Component } from 'react';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="group">
          <h2>相关资源</h2>
          <ul>
            <li><a href="https://ZhongAnTech.github.io/zarm-vue/#/documents/quick-start" rel="noopener noreferrer" target="_blank">Zarm Vue</a> - Zarm of Vue</li>
            <li><a href="https://jeromelin.github.io/zarm-web" rel="noopener noreferrer" target="_blank">Zarm Web</a></li>
            <li><a href="/#/design/download">设计资源下载</a></li>
          </ul>
        </div>
        <div className="group">
          <h2>社区</h2>
          <ul>
            <li><a href="https://zhuanlan.zhihu.com/c_135293309" rel="noopener noreferrer" target="_blank">众安前端知乎专栏</a></li>
            <li><a href="https://app.mokahr.com/apply/zhongan/320" rel="noopener noreferrer" target="_blank">加入我们</a></li>
          </ul>
        </div>
        <div className="group">
          <h2>帮助</h2>
          <ul>
            <li><a href="https://github.com/ZhongAnTech/zarm" rel="noopener noreferrer" target="_blank">Github</a></li>
            <li><a href="/#/components/change-log">更新日志</a></li>
            <li><a href="https://github.com/ZhongAnTech/zarm/issues/new" rel="noopener noreferrer" target="_blank">报告 Bug</a></li>
            <li><a href="https://github.com/ZhongAnTech/zarm/issues" rel="noopener noreferrer" target="_blank">Bug 列表</a></li>
            <li><a href="https://gitter.im/ZhonganTech/zarm" rel="noopener noreferrer" target="_blank">在线讨论</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
