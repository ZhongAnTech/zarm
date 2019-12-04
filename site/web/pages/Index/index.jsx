import React, { PureComponent } from 'react';
import { Dropdown } from 'dragon-ui';
import QRious from 'qrious';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import Meta from '@site/web/components/Meta';
import './style.scss';

class Page extends PureComponent {
  state = {
    dropdown: false,
  };

  componentDidMount() {
    const qr = new QRious({
      element: this.qrcode,
      value: `${window.location.origin}/demo.html`,
      size: 134,
    });
  }

  render() {
    const { history } = this.props;
    const { dropdown } = this.state;

    return (
      <Container className="index-page">
        <Meta title="Zarm Design - 众安科技移动端组件库" />
        <Header />
        <main>
          <div className="banner">
            <img src={require('./images/banner@2x.png')} alt="" />
          </div>
          <div className="introduce">
            <div className="title">
              <span>Zarm</span>
              &nbsp;Design
            </div>
            <div className="description">追求极致的用户体验，做有温度的组件库</div>
            <div className="navigation">
              <button type="button" onClick={() => history.push('/components/quick-start')}>开始使用</button>
              <Dropdown
                className="btn-try"
                trigger="hover"
                visible={dropdown}
                onVisibleChange={(visible) => {
                  this.setState({
                    dropdown: visible,
                  });
                }}
                overlay={<canvas ref={(ele) => { this.qrcode = ele; }} />}
              >
                <button type="button" className="ghost">扫码体验</button>
              </Dropdown>
            </div>
          </div>
        </main>
      </Container>
    );
  }
}

export default Page;
