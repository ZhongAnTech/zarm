import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Cell, Switch, Button, Modal, Confirm } from '../../components';

import '../styles/pages/ModalPage';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: {
        visible: false,
        children: 'aaa',
      },
    };
  }

  render() {
    const { modal } = this.state;

    return (
      <div className="modal-page">
        <Header title="模态框 Modal" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => {
                      modal.visible = true;
                      this.setState({ modal });
                    }}>开启</Button>
                }>默认关</Cell>

              <Cell
                description={
                  <Switch
                    checked={this.state.modal.visible}
                    onChange={() => this.open('modal2', {
                      onMaskClick: () => this.close('modal2'),
                    })}
                    />
                }>
                点击遮罩层可以关闭的模态框
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>点击遮罩层可以关闭的模态框</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button
                radius
                onClick={() => this.open('modal', {
                  onMaskClick: () => this.close('modal'),
                })}>打开</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>Dialog、Alert、Confirm模式的模态框</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button
                radius
                onClick={() => this.open('dialog', {
                  onMaskClick: () => this.close('dialog'),
                })}>Dialog</Button>
              <Button radius theme="info" onClick={() => this.open('alert', {})}>Alert</Button>
              <Button radius theme="warning" onClick={() => this.open('confirm', {})}>Confirm</Button>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>圆角模态框</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button radius onClick={() => this.open('modal', { isRadius: true })}>打开</Button>
            </Panel.Body>
          </Panel>

          <ModalDemo {...this.state.modal} />

          <Modal {...this.state.props} visible={this.state.modal1}>
            <Modal.Header title="标题" onClose={() => this.close('modal1')} />
            <Modal.Body>
              模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容模态框内容
            </Modal.Body>
          </Modal>

          <Modal {...this.state.props} visible={this.state.dialog}>
            <Modal.Header title="标题" onClose={() => this.close('dialog')} />
            <Modal.Body>
              模态框内容
            </Modal.Body>
          </Modal>

          <Modal radius {...this.state.props} visible={this.state.alert}>
            <Modal.Header title="警告" />
            <Modal.Body>
              这是一个警告提示框
            </Modal.Body>
            <Modal.Footer>
              <Button bordered onClick={() => this.close('alert')}>关闭</Button>
            </Modal.Footer>
          </Modal>

          <Confirm
            radius
            visible={this.state.confirm}
            title="多个按钮情况"
            message="这里有好多个按钮, 你试试"
            onOk={() => alert('click ok')}
            onCancel={() => this.close('confirm')}
            />
        </main>
      </div>
    );
  }
}

const ModalDemo = (props) => {
  const { visible, title, onClose, children, others } = props;

  return (
    <Modal visible={visible} {...others}>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default Page;
