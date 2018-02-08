import React, { Component } from 'react';
import { Panel, Cell, ActionSheet, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BUTTONS = [
  {
    text: '操作一',
    onClick: () => console.log('点击操作一'),
  },
  {
    text: '操作二',
    onClick: () => console.log('点击操作二'),
  },
  {
    theme: 'error',
    text: '操作三',
    onClick: () => console.log('点击操作三'),
  },
];

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
    };
  }

  toggle = (key) => {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  render() {
    return (
      <Container className="actionsheet-page">
        <Header title="动作面板 ActionSheet" />
        <main>
          <Panel>
            <Panel.Header title="提示信息" />
            <Panel.Body>
              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('visible1')}>开启</Button>
                }>普通</Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('visible2')}>开启</Button>
                }>带取消操作</Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('visible3')}>开启</Button>
                }>圆角、留边</Cell>
            </Panel.Body>
          </Panel>

          <ActionSheet
            visible={this.state.visible1}
            actions={BUTTONS}
            onMaskClick={() => this.toggle('visible1')}
            />

          <ActionSheet
            visible={this.state.visible2}
            actions={BUTTONS}
            onMaskClick={() => this.toggle('visible2')}
            onCancel={() => this.toggle('visible2')}
            />

          <ActionSheet
            spacing
            shape="radius"
            visible={this.state.visible3}
            actions={BUTTONS}
            onMaskClick={() => this.toggle('visible3')}
            onCancel={() => this.toggle('visible3')}
            />

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
