
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
            <Cell type="link" title="Toast" icon={<img src="https://weui.io/images/icon_nav_toast.png" />} onClick={() => hashHistory.push('/toast')} />
            <Cell type="link" title="Tab" icon={<img src="https://weui.io/images/icon_nav_tab.png" />} onClick={() => hashHistory.push('/tab')} />
            <Cell type="link" title="Radio" icon={<img src="https://weui.io/images/icon_nav_radio.png" />} onClick={() => hashHistory.push('/radio')} />
            <Cell type="link" title="lottery" onClick={() => hashHistory.push('/lottery')} />
            <Cell type="link" title="swipe" onClick={() => hashHistory.push('/swipe')} />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Index;