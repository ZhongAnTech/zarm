import React from 'react';
import { FormattedMessage } from 'react-intl';
import Meta from '@/web/components/Meta';
import './style.scss';

const RESOURCES = [
  {
    icon: require('./images/icon-zarm.png'),
    title: 'Zarm',
    description: <FormattedMessage id="app.home.resources.type.zarm" />,
    url: 'https://nstatic.zhongan.com/hfe-static/zarm/resources/Zarm.2.0.0-alpha.37.sketch',
  },
  {
    icon: require('./images/icon-zarm-web.png'),
    title: 'Zarm Web',
    description: <FormattedMessage id="app.home.resources.type.zarm-web" />,
    url: 'https://nstatic.zhongan.com/hfe-static/zarm/resources/Zarm-Web.0.0.1-alpha.1.zip',
  },
  {
    icon: require('./images/icon-zarm-frame.png'),
    title: 'Zarm Web Frame',
    description: <FormattedMessage id="app.home.resources.type.zarm-web-frame" />,
    url: 'https://nstatic.zhongan.com/hfe-static/zarm/resources/Zarm-Web-Frame.0.0.1.sketch',
  },
  {
    icon: require('./images/icon-axure.png'),
    title: 'Zarm Library For Axure',
    description: <FormattedMessage id="app.home.resources.type.zarm-axure" />,
    url: 'https://nstatic.zhongan.com/hfe-static/zarm/resources/Zarm-Mobile-Library.rplib',
  },
  {
    icon: require('./images/icon-axure.png'),
    title: 'Zarm Web Library For Axure',
    description: <FormattedMessage id="app.home.resources.type.zarm-web-axure" />,
    url: 'https://nstatic.zhongan.com/hfe-static/zarm/resources/Zarm-Web-Library.rplib',
  },
];

const Page = () => {
  return (
    <>
      <FormattedMessage id="app.home.resources">
        {(txt) => <Meta title={`${txt} - Zarm Design`} />}
      </FormattedMessage>
      <h1>
        <FormattedMessage id="app.home.resources" />
      </h1>
      <p>
        <FormattedMessage id="app.home.resources.introduce" />
      </p>
      <div className="resource-cards">
        {RESOURCES.map((source, index) => {
          return (
            <a
              key={+index}
              className="resource-card"
              target="_blank"
              rel="noopener noreferrer"
              href={source.url}
            >
              <div className="resource-card-icon">
                <img src={source.icon} alt={source.title} />
              </div>
              <div className="resource-card-content">
                <div className="resource-card-title">{source.title}</div>
                <div className="resource-card-description">{source.description}</div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Page;
