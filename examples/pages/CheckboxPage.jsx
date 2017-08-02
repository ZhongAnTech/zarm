import React, { PureComponent } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Checkbox } from '../../components';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checkbox: [],
    };
  }

  render() {
    return (
      <Container className="checkbox-page">
        <Header title="复选框 Checkbox" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Checkbox.Group
                    value={this.state.checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>普通</Cell>

              <Cell><Checkbox value="0">同意条款</Checkbox></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>按钮样式</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell
                description={
                  <Checkbox.Group
                    type="button"
                    value={this.state.checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>普通</Cell>

              <Cell
                description={
                  <Checkbox.Group
                    type="button"
                    defaultValue={['0', '1']}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>指定默认值</Cell>

              <Cell
                description={
                  <Checkbox.Group
                    type="button"
                    value={this.state.checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2" disabled>选项三</Checkbox>
                  </Checkbox.Group>
                }>禁用指定项</Cell>

              <Cell
                description={
                  <Checkbox.Group
                    type="button"
                    shape="radius"
                    value={this.state.checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>圆角</Cell>

              <Cell
                description={
                  <Checkbox.Group
                    type="button"
                    shape="round"
                    value={this.state.checkbox}
                    onChange={value => console.log(`checkbox to ${value}`)}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>椭圆角</Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>列表样式</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Checkbox.Group
                type="cell"
                value={this.state.checkbox}
                onChange={value => console.log(`checkbox to ${value}`)}>
                <Checkbox value="0">选项一</Checkbox>
                <Checkbox value="1">选项二</Checkbox>
                <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
              </Checkbox.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>列表样式禁用状态</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Checkbox.Group
                disabled
                type="cell"
                value={this.state.checkbox}
                onChange={value => console.log(`checkbox to ${value}`)}>
                <Checkbox value="0">选项一</Checkbox>
                <Checkbox value="1">选项二</Checkbox>
                <Checkbox value="2">选项三</Checkbox>
              </Checkbox.Group>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
