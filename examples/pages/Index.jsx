
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Panel, Icon, Cell } from '../../components';

import '../styles/pages/IndexPage';

class Index extends Component {

  render() {
    return (
      <div className="index-page">
        <img className="logo" src={require('../images/logo.jpg')} />
        <Panel>
          <Panel.Body>
            <Cell type="link" title="Icon" icon={<img src="https://weui.io/images/icon_nav_msg.png" />} onClick={() => hashHistory.push('/icon')} />
            <Cell type="link" title="Button" icon={<img src="https://weui.io/images/icon_nav_button.png" />} onClick={() => hashHistory.push('/button')} />
            <Cell type="link" title="Cell" icon={<img src="https://weui.io/images/icon_nav_cell.png" />} onClick={() => hashHistory.push('/cell')} />
            <Cell type="link" title="Modal" icon={<img src="https://weui.io/images/icon_nav_dialog.png" />} onClick={() => hashHistory.push('/modal')} />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Index;