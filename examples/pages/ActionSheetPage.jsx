import React, { Component } from 'react';
import { Panel, Cell, ActionSheet, Button, Wheel } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      dataSource: [
        { value: 1, label: 'a' },
        { value: 2, label: 'b' },
      ],
      dataSource1: [
        [
          { value: 1, label: 'a' },
          { value: 2, label: 'b' },
        ],
        [
          { value: 3, label: 'c' },
          { value: 4, label: 'd' },
        ],
      ],
      dataSource2: [
        {
          value: 1,
          label: 'a',
          children: [
            { value: 11, label: 'a1' },
            { value: 12, label: 'a2' },
          ],
        },
        {
          value: 2,
          label: 'b',
          children: [
            { value: 21, label: 'b1' },
            { value: 22, label: 'b2' },
          ],
        },
      ],
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
              <Wheel.Group value={[2, 3]} dataSource={this.state.dataSource1} onChange={value => console.log(value.map(d => d.label))} />
              <Wheel.Group value={[2, 22]} dataSource={this.state.dataSource2} onChange={value => console.log(value.map(d => d.label))} />
              <Wheel
                dataSource={this.state.dataSource}
                onChange={value => console.log(value)}
                />


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
                }>圆角留间隔</Cell>
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

          <ActionSheet
            spacing
            shape="radius"
            visible={this.state.visible3}
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
            onCancel={() => this.toggle('visible3')}
            />

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
