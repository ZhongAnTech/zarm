import React, { Component } from 'react';
import Header from '../components/Header';
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
        <Header title="轻提示 Toast" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>提示信息</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button
                block
                shape="radius"
                theme="error"
                onClick={() => {
                  toast.visible = true;
                  toast.duration = 3000;
                  toast.children = '默认3秒自动关闭';
                  this.setState({ toast });
                }}>错误提示</Button>
              <Button
                block
                shape="radius"
                theme="success"
                onClick={() => {
                  toast.visible = true;
                  toast.duration = 3000;
                  toast.children = (
                    <div>
                      <Icon type="right-round-fill" style={{ fontSize: '3rem' }} />
                      <div style={{ marginTop: '10px' }}>预约成功</div>
                    </div>
                  );
                  this.setState({ toast });
                }}>成功提示</Button>

              <Button
                block
                bordered
                shape="radius"
                onClick={() => {
                  toast.visible = true;
                  toast.duration = 10000;
                  toast.children = '指定10秒自动关闭';
                  this.setState({ toast });
                }}>指定关闭时间</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>加载中</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button
                block
                bordered
                shape="radius"
                onClick={() => this.setState({ loading: true })}>
                开启
              </Button>
            </Panel.Body>
          </Panel>

          <Toast {...this.state.toast} />

          <Loading visible={this.state.loading} />
        </main>
      </div>
    );
  }
}

export default ToastPage;
