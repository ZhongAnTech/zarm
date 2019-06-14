import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

const RESOURCES = [
  {
    icon: require('./images/icon-zarm.png'),
    title: 'Zarm Design',
    description: '移动端组件 Sketch 模板',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm.2.0.0-alpha.37.sketch',
  },
  {
    icon: require('./images/icon-zarm-web.png'),
    title: 'Zarm-Web Design',
    description: '桌面端组件 Sketch 模板',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm-Web.0.0.1-alpha.1.zip',
  },
];

class Page extends PureComponent {
  render() {
    return (
      <div className="download-page">
        <h1>设计资源下载</h1>
        <p>这里提供 Zarm Design 相关设计资源和设计工具的下载，更多设计资源正在整理和完善中。</p>
        <div className="resource-cards">
          {
            RESOURCES.map((source, index) => {
              return (
                <a key={+index} className="resource-card" target="_blank" rel="noopener noreferrer" href={source.url}>
                  <div className="resource-card-icon">
                    <img src={source.icon} alt={source.title} />
                  </div>
                  <div className="resource-card-content">
                    <div className="resource-card-title">{source.title}</div>
                    <div className="resource-card-description">{source.description}</div>
                  </div>
                </a>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Page);
