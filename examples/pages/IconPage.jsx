
import React, { Component } from 'react';
import { Panel, Icon } from '../../components';

import '../styles/pages/IconPage';

class IconPage extends Component {

  render() {
    return (
      <div className="icon-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>Icon图标</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Icon type="right" theme="success" />
            <Icon type="right-round" theme="success" />
            <Icon type="right-round-fill" theme="success" />
            <Icon type="wrong" theme="error" />
            <Icon type="wrong-round" theme="error" />
            <Icon type="wrong-round-fill" theme="error" />
            <Icon type="info-round" theme="info" />
            <Icon type="info-round-fill" theme="info" />
            <Icon type="question-round" />
            <Icon type="question-round-fill" />
            <Icon type="warning-round" theme="warning" />
            <Icon type="warning-round-fill" theme="warning" />
            <Icon type="arrow-left" />
            <Icon type="arrow-right" />
            <Icon type="arrow-top" />
            <Icon type="arrow-bottom" />
            <Icon type="add" />
            <Icon type="add-round" />
            <Icon type="add-round-fill" />
            <Icon type="minus" />
            <Icon type="minus-round" />
            <Icon type="minus-round-fill" />
            <Icon type="date" />
            <Icon type="loading" />
          </Panel.Body>
        </Panel>

      </div>
    );
  }
}

export default IconPage;