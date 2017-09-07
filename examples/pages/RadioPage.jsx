import React, { PureComponent } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Radio } from '../../components';
import '../styles/pages/RadioPage';

class Page extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      radio: '0',
    };
  }

  render() {
    return (
      <Container className="radio-page">
        <Header title="单选框 Radio" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body className="radio-buttons">
              <Cell><Radio>普通</Radio></Cell>
              <Cell><Radio defaultChecked>默认选中</Radio></Cell>
              <Cell><Radio disabled>禁用</Radio></Cell>
              <Cell><Radio defaultChecked disabled>选中且禁用</Radio></Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="按钮样式" />
            <Panel.Body className="radio-buttons">
              <Cell
                description={
                  <Radio.Group
                    type="button"
                    value={this.state.radio}
                    onChange={value => console.log(`radio to ${value}`)}>
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>普通</Cell>

              <Cell
                description={
                  <Radio.Group type="button" defaultValue="1">
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>指定默认值</Cell>

              <Cell
                description={
                  <Radio.Group type="button">
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2" disabled>选项三</Radio>
                  </Radio.Group>
                }>禁用指定项</Cell>

              <Cell
                description={
                  <Radio.Group type="button" shape="radius">
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>圆角</Cell>

              <Cell
                description={
                  <Radio.Group type="button" shape="round">
                    <Radio value="0">选项一</Radio>
                    <Radio value="1">选项二</Radio>
                    <Radio value="2">选项三</Radio>
                  </Radio.Group>
                }>椭圆角</Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="块级样式" />
            <Panel.Body className="block-box">
              <Radio.Group block compact type="button" shape="radius">
                <Radio value="0">选项一</Radio>
                <Radio value="1">选项二</Radio>
                <Radio value="2">选项三</Radio>
              </Radio.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="列表样式" />
            <Panel.Body>
              <Radio.Group type="cell">
                <Radio value="0">选项一</Radio>
                <Radio value="1">选项二</Radio>
                <Radio value="2" disabled>选项三（禁止选择）</Radio>
              </Radio.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="列表样式禁用状态" />
            <Panel.Body>
              <Radio.Group disabled type="cell">
                <Radio value="0">选项一</Radio>
                <Radio value="1">选项二</Radio>
                <Radio value="2">选项三</Radio>
              </Radio.Group>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
