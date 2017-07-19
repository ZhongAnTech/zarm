import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Popup, Button } from '../../components';
import '../styles/pages/PopupPage';


class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
    };
  }

  open(key) {
    this.setState({
      [`${key}`]: true,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <div className="popup-page">
        <Header title="弹出框 Popup" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Button theme="info" size="sm" onClick={() => this.open('popBottom')}>从下方弹出popUp</Button>
              <Button theme="info" size="sm" onClick={() => this.open('popTop')}>从上方弹出popUp</Button>
              <Button theme="info" size="sm" onClick={() => this.open('popLeft')}>从左侧弹出popUp</Button>
              <Button theme="info" size="sm" onClick={() => this.open('popRight')}>从右侧弹出popUp</Button>
            </Panel.Body>
          </Panel>
        </main>

        <Popup
          visible={this.state.popBottom}
          direction="bottom"
          onMaskClick={() => this.close('popBottom')}
          onClose={() => console.log('关闭')}>
          <div className="pop-con">
            <Button size="sm" onClick={() => this.close('popBottom')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={this.state.popTop}
          direction="top"
          mask={false}
          duration="3000"
          autoClose
          onMaskClick={() => this.close('popTop')}
          onClose={() => console.log('关闭')}>
          <div className="pop-con-top">
            更新成功
          </div>
        </Popup>

        <Popup
          className="popwrap-left"
          visible={this.state.popLeft}
          onMaskClick={() => this.close('popLeft')}
          direction="left"
          onClose={() => console.log('关闭')}>
          <div className="pop-con">
            <Button size="sm" onClick={() => this.close('popLeft')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={this.state.popRight}
          onMaskClick={() => this.close('popRight')}
          direction="right"
          onClose={() => console.log('关闭')}>
          <div className="pop-con">
            <Button size="sm" onClick={() => this.close('popRight')}>关闭弹层</Button>
          </div>
        </Popup>

      </div>
    );
  }
}

export default Page;
