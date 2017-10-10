import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Button, Modal, Confirm, Alert } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      confirm: false,
    };
  }

  open = (key) => {
    this.setState({
      [`${key}`]: true,
    });
  }

  close = (key) => {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <Container className="modal-page">
        <Header title="模态框 Modal" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.open('modal1')}>开启</Button>
                }>普通</Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.open('modal3')}>开启</Button>
                }>
                圆角
              </Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.open('modal2')}>开启</Button>
                }>
                遮罩层可关闭
              </Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.open('modal4')}>开启</Button>
                }>无头部</Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    onClick={() => this.open('modal5')}>开启</Button>
                }>动画效果</Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="特定场景" />
            <Panel.Body>
              <Cell
                description={
                  <Button
                    size="xs"
                    theme="warning"
                    onClick={() => this.open('alert')}>开启</Button>
                }>
                警告框 Alert
              </Cell>

              <Cell
                description={
                  <Button
                    size="xs"
                    theme="warning"
                    onClick={() => this.open('confirm')}>开启</Button>
                }>
                确认框 Confirm
              </Cell>
            </Panel.Body>
          </Panel>

          <Modal visible={this.state.modal1}>
            <Modal.Header title="标题" onClose={() => this.close('modal1')} />
            <Modal.Body>
              模态框内容
            </Modal.Body>
          </Modal>

          <Modal visible={this.state.modal2} onMaskClick={() => this.close('modal2')}>
            <Modal.Header title="标题" />
            <Modal.Body>
              点击遮罩层关闭
            </Modal.Body>
          </Modal>

          <Modal shape="radius" visible={this.state.modal3}>
            <Modal.Header title="标题" onClose={() => this.close('modal3')} />
            <Modal.Body>
              模态框内容
            </Modal.Body>
          </Modal>

          <Modal visible={this.state.modal4} onMaskClick={() => this.close('modal4')}>
            <Modal.Body>
              无头部
            </Modal.Body>
          </Modal>

          <Modal visible={this.state.modal5} animationType="rotate" onMaskClick={() => this.close('modal5')}>
            <Modal.Body>
              当前使用的是rotate旋转效果。<br /><br />
              支持多种动画效果：<br />
              fade：淡出淡入效果（默认）<br />
              zoom：缩放效果<br />
              rotate：旋转效果<br />
              door：开关门效果<br />
              flip：翻转效果<br />
              moveUp、moveDown、moveLeft、moveRight：移出移入效果<br />
              slideUp、slideDown、slideLeft、slideRight：滑出滑入效果<br />
            </Modal.Body>
          </Modal>

          <Alert
            shape="radius"
            visible={this.state.alert}
            title="警告"
            message="这里是警告信息"
            onCancel={() => this.close('alert')}
            />

          <Confirm
            shape="radius"
            visible={this.state.confirm}
            title="确认信息"
            message="你确定要这样做吗？"
            onOk={() => alert('click ok')}
            onCancel={() => this.close('confirm')}
            />

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
