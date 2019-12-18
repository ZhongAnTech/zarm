import React, { Component } from 'react';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="group">
          <h2>相关资源</h2>
          <ul>
            <li><a href="https://ZhongAnTech.github.io/zarm-vue/#/documents/quick-start">Zarm Vue</a> - Zarm of Vue</li>
            <li><a href="https://jeromelin.github.io/zarm-web">Zarm Web</a></li>
            <li><a href="/#/design/download">设计资源下载</a></li>
          </ul>
        </div>
        <div className="group">
          <h2>社区</h2>
          <ul>
            <li><a href="https://app.mokahr.com/apply/zhongan/320">加入我们</a></li>
          </ul>
        </div>
        <div className="group">
          <h2>帮助</h2>
          <ul>
            <li><a href="https://github.com/ZhongAnTech/zarm">Github</a></li>
            <li><a href="/#/components/change-log">更新日志</a></li>
            <li><a href="https://github.com/ZhongAnTech/zarm/issues">在线讨论</a></li>
            <li><a href="https://github.com/ZhongAnTech/zarm/issues/new">报告 Bug</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
