
import React, { Component } from 'react';
import { Panel, Toast, Loading, Button, Icon } from '../../components';

import '../styles/pages/ToastPage';

class ButtonPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toast1: false,
      toast2: false,
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
            <Panel.Title>提示信息</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button onClick={() => this.toggle('toast1')}>错误提示</Button>
            <Button onClick={() => this.toggle('toast2')}>成功提示</Button>
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>加载中</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button onClick={() => this.toggle('loading')}>开启</Button>
          </Panel.Body>
        </Panel>

        <Toast
          visible={this.state.toast1}
          onMaskClick={() => this.toggle('toast1')}>
          手机号码不能为空
        </Toast>

        <Toast
          visible={this.state.toast2}
          onMaskClick={() => this.toggle('toast2')}>
          <Icon type="check-round" style={{ fontSize: '3rem' }} />
          <p>预约成功</p>
        </Toast>

        <Loading visible={this.state.loading} />
      </div>
    );
  }
}

export default ButtonPage;