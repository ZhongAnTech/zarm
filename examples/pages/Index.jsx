
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Panel, Icon, Cell } from '../../components';

class Index extends Component {

  render() {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Cell type="link" title="Icon" icon={<img src="https://weui.io/images/icon_nav_msg.png" />} onClick={() => browserHistory.push('/icon')} />
            <Cell type="link" title="Button" icon={<img src="https://weui.io/images/icon_nav_button.png" />} onClick={() => browserHistory.push('/button')} />
            <Cell type="link" title="Cell" icon={<img src="https://weui.io/images/icon_nav_cell.png" />} onClick={() => browserHistory.push('/cell')} />
            <Cell type="link" title="Modal" icon={<img src="https://weui.io/images/icon_nav_dialog.png" />} onClick={() => browserHistory.push('/modal')} />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Index;