import React, { PureComponent } from 'react';
import { Dropdown } from 'dragon-ui';
import QRious from 'qrious';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import './style.scss';

class Page extends PureComponent {
  state = {
    dropdown: false,
  }

  componentDidMount() {
    const qr = new QRious({
      element: this.qrcode,
      value: `${window.location.origin}/demo.html`,
      size: 134,
    });
  }

  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <Header />
        <main>
          <div className="banner">
            <img src={require('./images/banner2.png')} alt="" />
          </div>
          <div className="introduce">
            <div className="title"><span>ZARM</span> DESIGN</div>
            <div className="description">基于 React / React Native / Vue 的跨平台移动端 UI 组件库，为用户体验而生</div>
            <div className="navigation">
              <button onClick={() => history.push('/documents/quick-start')}>开始使用</button>
              <Dropdown
                className="btn-try"
                trigger="hover"
                visible={this.state.dropdown}
                onVisibleChange={(visible) => {
                  this.setState({
                    dropdown: visible,
                  });
                }}
                overlay={<canvas ref={(ele) => { this.qrcode = ele; }} />}
              >
                <button className="ghost">扫码体验</button>
              </Dropdown>
            </div>
          </div>
        </main>
      </Container>
    );
  }
}

export default Page;
