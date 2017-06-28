import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Icon, Input, Cell, Checkbox, Badge } from '../../components';
import '../styles/pages/BadgePage';

const img = require('../images/icons/state.png');

class Page extends Component {

  render() {
    return (
      <div className="badge-page">
        <Header title="徽标 Badge" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell hasArrow title="标题文字" description={<Badge shape="dot" />} />
              <Cell hasArrow title="标题文字" description={<span><Badge text="免费" /> <Badge shape="radius" text="new" /></span>} />
              <Cell hasArrow title="标题文字" description={<Badge shape="round" text={3} />} />
              <Cell hasArrow title="标题文字" description={<Badge shape="round" text="999+" />} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>上标</Panel.Title>
            </Panel.Header>
            <Panel.Body className="custom-panel">
              <div className="box">
                <Badge sup shape="dot"><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="radius" text="new"><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="round" text={3}><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="round" text="999+"><div className="box-item" /></Badge>
              </div>
            </Panel.Body>
          </Panel>

        </main>
      </div>
    );
  }
}

export default Page;
