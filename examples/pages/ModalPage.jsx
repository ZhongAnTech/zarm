
import React, { Component } from 'react';
import { Panel, Button, Modal, Confirm, Toast } from '../../components';

import '../styles/pages/ModalPage';

class ModalPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      props: {},
      modal: false,
      dialog: false,
      alert: false,
      confirm: false,
    };
  }

  open(key, props) {
    this.setState({
      [`${key}`]: true,
      props,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <div className="modal-page">

        <Panel>
          <Panel.Header>
            <Panel.Title>普通模态框</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Button radius onClick={() => this.open('modal', {})}>打开</Button>
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

        <Modal {...this.state.props} visible={this.state.modal}>
          <Modal.Header title="标题" onClose={() => this.close('modal')} />
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
      </div>
    );
  }
}

export default ModalPage;
