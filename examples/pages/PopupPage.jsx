import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Popup, Cell, Button } from '../../components';
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
      <Container className="popup-page">
        <Header title="弹出框 Popup" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell
                description={
                  <Button size="xs" onClick={() => this.open('popTop')}>开启</Button>
                }>从上方弹出</Cell>

              <Cell
                description={
                  <Button size="xs" onClick={() => this.open('popBottom')}>开启</Button>
                }>从下方弹出</Cell>

              <Cell
                description={
                  <Button size="xs" onClick={() => this.open('popLeft')}>开启</Button>
                }>从左侧弹出</Cell>

              <Cell
                description={
                  <Button size="xs" onClick={() => this.open('popRight')}>开启</Button>
                }>从右侧弹出</Cell>
            </Panel.Body>
          </Panel>

          <Popup
            autoClose
            visible={this.state.popTop}
            direction="top"
            duration={3000}
            maskType="transparent"
            onMaskClick={() => this.close('popTop')}
            onClose={() => console.log('关闭')}>
            <div className="popup-box-top">
              更新成功
            </div>
          </Popup>

          <Popup
            visible={this.state.popBottom}
            direction="bottom"
            onMaskClick={() => this.close('popBottom')}
            onClose={() => console.log('关闭')}>
            <div className="popup-box">
              <Button size="sm" onClick={() => this.close('popBottom')}>关闭弹层</Button>
            </div>
          </Popup>

          <Popup
            visible={this.state.popLeft}
            onMaskClick={() => this.close('popLeft')}
            direction="left"
            onClose={() => console.log('关闭')}>
            <div className="popup-box-left">
              <Button size="sm" onClick={() => this.close('popLeft')}>关闭弹层</Button>
            </div>
          </Popup>

          <Popup
            visible={this.state.popRight}
            onMaskClick={() => this.close('popRight')}
            direction="right"
            onClose={() => console.log('关闭')}>
            <div className="popup-box">
              <Button size="sm" onClick={() => this.close('popRight')}>关闭弹层</Button>
            </div>
          </Popup>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
