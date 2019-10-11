import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@site/web/components/Container';
import Meta from '@site/web/components/Meta';
import './style.scss';

const META = {
  title: '设计资源下载 - Zarm Design',
  description: '',
};

const RESOURCES = [
  {
    icon: require('./images/icon-zarm.png'),
    title: 'Zarm',
    description: '移动端组件 Sketch 模板',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm.2.0.0-alpha.37.sketch',
  },
  {
    icon: require('./images/icon-zarm-web.png'),
    title: 'Zarm Web',
    description: '桌面端组件 Sketch 模板',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm-Web.0.0.1-alpha.1.zip',
  },
  {
    icon: require('./images/icon-zarm-frame.png'),
    title: 'Zarm Web Frame',
    description: '中后台框架 Sketch 模板',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm-Web-Frame.0.0.1.sketch',
  },
  {
    icon: require('./images/icon-axure.png'),
    title: 'Zarm Web Library For Axure',
    description: '桌面端组件 Axure 元件库',
    url: 'https://static-health-cdn.zhongan.com/zarm/design/Zarm-Web-Library.rplib',
  },
];

class Page extends PureComponent {
  render() {
    return (
      <Container className="download-page markdown">
        <Meta title={META.title} description={META.description} />
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
      </Container>
    );
  }
}

export default withRouter(Page);
