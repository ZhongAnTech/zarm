
import React, { Component } from 'react';
import { Panel, Toast, Loading, Button, Icon } from '../../components';

import '../styles/pages/ToastPage';

class ButtonPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toast: false,
      loading: false
    }
  }

  toggle(key) {
    this.setState({
      [`${ key }`]: !this.state[key]
    });
  }

  render() {
    return (
      <div className="toast-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>Toast 和 Loading</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button onClick={() => this.toggle('toast')}>Toast</Button>
            <Button onClick={() => this.toggle('loading')}>Loading</Button>
          </Panel.Body>
        </Panel>

        <Toast
          visible={this.state.toast}
          onMaskClick={() => this.toggle('toast')}>
          <Icon type="check-round" style={{ fontSize: '3rem' }} />
          <p>预约成功</p>
          <p>预约时间为2016.06.06</p>
        </Toast>

        <Loading visible={this.state.loading} />
      </div>
    );
  }
}

export default ButtonPage;