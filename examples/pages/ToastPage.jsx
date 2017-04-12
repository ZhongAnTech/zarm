
import React, { Component } from 'react';
import { Panel, Toast, Loading, Button, Icon } from '../../components';

import '../styles/pages/ToastPage';

class ToastPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toast: {
        visible: false,
        onMaskClick: () => {
          const toast = this.state.toast;
          toast.visible = false;
          this.setState({ toast });
        },
      },
      loading: false,
    };
  }

  toggle(key) {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  render() {
    const { toast } = this.state;

    return (
      <div className="toast-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>提示信息</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button
              onClick={() => {
                toast.visible = true;
                toast.children = '手机号码不能为空';
                toast.onMaskClick = () => {
                  toast.visible = false;
                  this.setState({ toast });
                };
                this.setState({ toast });
              }}>错误提示</Button>
            <Button
              onClick={() => {
                toast.visible = true;
                toast.children = (
                  <div>
                    <Icon type="right-round-fill" style={{ fontSize: '3rem' }} />
                    <p>预约成功</p>
                  </div>
                );
                toast.onMaskClick = () => {
                  toast.visible = false;
                  this.setState({ toast });
                };
                this.setState({ toast });
              }}>成功提示</Button>
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

        <Toast {...this.state.toast} />

        <Loading visible={this.state.loading} />
      </div>
    );
  }
}

export default ToastPage;
