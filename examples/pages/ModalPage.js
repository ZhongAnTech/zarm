
import React, { Component } from 'react';
import hljs from 'highlight.js';
import Document from '../components/Document';
import {
  Button,
  Modal, 
  Alert, 
  Confirm
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/example.scss';

class ModalPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal      : false,
      radiusModal: false,
      roundModal : false,
      FooterModal: false,
      maskModal  : false,
      widthModal : false,
      aniModal   : false,
      aniType    : 'fade',
    };
  }

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  _onClickOpenAni(key, type) {
    this.setState({
      aniModal: true,
      aniType : type
    });
  }

  _onClickOpen(key) {
    this.setState({
      [`${key}`]: true
    });
  }

  _onClickClose(key) {
    this.setState({
      [`${key}`]: false
    });
  }

  render() {

    return (
      <div className="example">
        <div className="title">
          <h1>Modal</h1>
          <p>模态框</p>
        </div>

{/* 普通模态框 */}
        <Document title="普通模态框" 
          demo={
            <div>
              <Button theme="primary" onClick={() => this._onClickOpen('modal')}>Open Modal</Button>
              <Modal visible={this.state.modal} width={600} onMaskClick={() => this._onClickClose('modal')}>
                <Modal.Header title="普通模态框" onClose={() => this._onClickClose('modal')}></Modal.Header>
                <Modal.Body>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
              </Modal>
            </div>
          }
          code={
`import { Modal } from 'dragon-ui';

ReactDOM.render(
<Modal visible={this.state.modal} width={600} onMaskClick={() => this._onClickClose('modal')}>
  <Modal.Header title="普通模态框" onClose={() => this._onClickClose('modal')}></Modal.Header>
  <Modal.Body>
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
  </Modal.Body>
</Modal>
, document.getElementById('modal-demo'));`
        } />

{/* 圆角/椭圆模态框 */}
        <Document title="圆角/椭圆模态框"
          demo={
            <div>
              <div className="demo-inline">
                <Button onClick={() => this._onClickOpen('radiusModal')}>Open Radius Modal</Button>
                <Button theme="primary" onClick={() => this._onClickOpen('roundModal')}>Open Round Modal</Button>
              </div>
              <Modal 
                visible={this.state.radiusModal}
                width={600}
                radius
                onMaskClick={() => this._onClickClose('radiusModal')}>
                <Modal.Header title="圆角模态框" onClose={() => this._onClickClose('radiusModal')}></Modal.Header>
                <Modal.Body>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
              </Modal>
              <Modal 
                visible={this.state.roundModal}
                width={600}
                round
                onMaskClick={() => this._onClickClose('roundModal')}>
                <Modal.Header title="椭圆模态框" onClose={() => this._onClickClose('roundModal')}></Modal.Header>
                <Modal.Body>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
              </Modal>
            </div>
          }
          code={
`import { Modal } from 'dragon-ui';

ReactDOM.render(
<Modal 
  visible={this.state.radiusModal}
  width={600}
  radius
  onMaskClick={() => this._onClickClose('radiusModal')}>
  <Modal.Header title="圆角模态框" onClose={() => this._onClickClose('radiusModal')}></Modal.Header>
  <Modal.Body>
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
  </Modal.Body>
</Modal>
, document.getElementById('modal-radius-demo'));

ReactDOM.render(
<Modal 
  visible={this.state.roundModal}
  width={600}
  round
  onMaskClick={() => this._onClickClose('roundModal')}>
  <Modal.Header title="椭圆模态框" onClose={() => this._onClickClose('roundModal')}></Modal.Header>
  <Modal.Body>
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
  </Modal.Body>
</Modal>
, document.getElementById('modal-round-demo'));`
          } />

{/* 带底部的模态框 */}
        <Document title="带底部的模态框"
          demo={
            <div>
              <Button theme="primary" onClick={() => this._onClickOpen('footerModal')}>Open Modal</Button>
              <Modal 
                visible={this.state.footerModal}
                width={600}
                onMaskClick={() => this._onClickClose('footerModal')}>
                <Modal.Header title="带底部的模态框"></Modal.Header>
                <Modal.Body>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" onClick={() => this._onClickClose('footerModal')}>取消</button>
                  <button type="button" onClick={() => { alert('你点了选项一') }}>选项一</button>
                  <button type="button" onClick={() => { alert('你点击了确定') }}>确定</button>
                </Modal.Footer>
              </Modal>
            </div>
          }
          code={
`import { Modal } from 'dragon-ui';

ReactDOM.render(
<Modal 
  visible={this.state.footerModal}
  width={600}
  onMaskClick={() => this._onClickClose('footerModal')}>
  <Modal.Header title="带底部的模态框"></Modal.Header>
  <Modal.Body>
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
  </Modal.Body>
  <Modal.Footer>
    <button type="button" onClick={() => this._onClickClose('footerModal')}>取消</button>
    <button type="button" onClick={() => { alert('你点了选项一') }}>选项一</button>
    <button type="button" onClick={() => { alert('你点击了确定') }}>确定</button>
  </Modal.Footer>
</Modal>
, document.getElementById('modal-footer-demo'));`
          } />

{/* 固定宽高的模态框 */}
        <Document title="固定宽高的模态框"
          demo={
            <div>
              <Button theme="primary" onClick={() => this._onClickOpen('widthModal')}>Open Modal</Button>
              <Modal 
                visible={this.state.widthModal}
                width={600}
                onMaskClick={() => this._onClickClose('widthModal')}>
                <Modal.Header title="固定宽高的模态框" onClose={() => this._onClickClose('widthModal')}></Modal.Header>
                <Modal.Body height={400}>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
              </Modal>
            </div>
          }
          code={
`import { Modal } from 'dragon-ui';

ReactDOM.render(
<Modal 
  visible={this.state.widthModal}
  width={600}
  onMaskClick={() => this._onClickClose('widthModal')}>
  <Modal.Header title="固定宽高的模态框" onClose={() => this._onClickClose('widthModal')}></Modal.Header>
  <Modal.Body height={400}>
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
    模态框内容<br />
  </Modal.Body>
</Modal>
, document.getElementById('modal-footer-demo'));`
          } />

{/* 不同进出场动画的模态框 */}
        <Document title="不同进出场动画的模态框"
          demo={
            <div>
              <div className="demo-inline">
                <Button onClick={() => this._onClickOpenAni('aniModal', 'fade')}>Open Fade Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'zoom')}>Open Zoom Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'door')}>Open Door Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'flip')}>Open Flip Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'rotate')}>Open Rotate Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'slideUp')}>Open SlideUp Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'slideDown')}>Open SlideDown Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'slideLeft')}>Open slideLeft Modal</Button>
                <Button onClick={() => this._onClickOpenAni('aniModal', 'slideRight')}>Open slideRight Modal</Button>
              </div>
              <Modal 
                visible={this.state.aniModal}
                animationType={this.state.aniType}
                width={270}
                onMaskClick={() => this._onClickClose('aniModal', '')}>
                <Modal.Header title={this.state.aniType + ' 动画的模态框'} onClose={() => this._onClickClose('aniModal')}></Modal.Header>
                <Modal.Body>
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                  模态框内容<br />
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" onClick={() => this._onClickClose('aniModal')}>取消</button>
                  <button type="button" onClick={() => { alert('你点了选项一') }}>选项一</button>
                  <button type="button" onClick={() => { alert('你点击了确定') }}>确定</button>
                </Modal.Footer>
              </Modal>
            </div>
          }
          code={``} />

      </div>
    );
  }
}

export default ModalPage;