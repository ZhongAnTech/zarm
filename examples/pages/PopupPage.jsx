import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Popup, Button } from '../../components';


class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popBottom: false,
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
              <Button theme="info" size="lg" onClick={() => this.open('popBottom')}>从下方弹出popUp</Button>
            </Panel.Body>
          </Panel>
        </main>

        <Popup
          visible={this.state.popBottom}
          onMaskClick={() => this.close('popBottom')}>
          我从下方弹出
        </Popup>
      </div>
    );
  }
}

export default Page;
