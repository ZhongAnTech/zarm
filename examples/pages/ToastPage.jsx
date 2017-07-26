import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Toast, Loading, Button, Icon } from '../../components';

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

              <Cell
                description={
                  <Button
                    size="xs"
                    theme="error"
                    onClick={() => {
                      toast.visible = true;
                      toast.duration = 3000;
                      toast.children = '默认3秒自动关闭';
                      this.setState({ toast });
                    }}>开启</Button>
                }>错误提示</Cell>

              <Cell
                description={
                  <Button
                    size="xs"
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
                    }}>开启</Button>
                }>成功提示</Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => {
                      toast.visible = true;
                      toast.duration = 10000;
                      toast.children = '指定10秒自动关闭';
                      this.setState({ toast });
                    }}>开启</Button>
                }>指定关闭时间</Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>加载中</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.setState({ loading: true })}>
                    开启
                  </Button>
                }>Loading</Cell>
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
