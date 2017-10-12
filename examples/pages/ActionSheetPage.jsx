import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, ActionSheet, Button } from '../../components';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
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
                  <Button size="xs" onClick={() => this.toggle('visible1')}>开启</Button>
                }>普通</Cell>

              <Cell
                description={
                  <Button size="xs" onClick={() => this.toggle('visible2')}>开启</Button>
                }>带取消操作</Cell>
            </Panel.Body>
          </Panel>

          <ActionSheet
            visible={this.state.visible1}
            onMaskClick={() => this.toggle('visible1')}
            actions={[
              {
                text: '操作一',
                onClick: () => console.log('点击操作一'),
              },
              {
                text: '操作二',
                onClick: () => console.log('点击操作二'),
              },
            ]}
            />

          <ActionSheet
            visible={this.state.visible2}
            onMaskClick={() => this.toggle('visible2')}
            actions={[
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
            ]}
            onCancel={() => this.toggle('visible2')}
            />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
