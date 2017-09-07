import React, { PureComponent } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Checkbox } from '../../components';
import '../styles/pages/CheckboxPage';

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
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell><Checkbox>普通</Checkbox></Cell>
              <Cell><Checkbox defaultChecked>默认选中</Checkbox></Cell>
              <Cell><Checkbox disabled>禁用</Checkbox></Cell>
              <Cell><Checkbox defaultChecked disabled>选中且禁用</Checkbox></Cell>
              <Cell className="agreement-box">
                <Checkbox id="agreement" />
                <label htmlFor="agreement">阅读并同意<a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《XXX条款》</a>中的相关规定</label>
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="按钮样式" />
            <Panel.Body>
              <Cell
                description={
                  <Checkbox.Group type="button">
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>普通</Cell>

              <Cell
                description={
                  <Checkbox.Group type="button" defaultValue={['0', '1']}>
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>指定默认值</Cell>

              <Cell
                description={
                  <Checkbox.Group type="button">
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2" disabled>选项三</Checkbox>
                  </Checkbox.Group>
                }>禁用指定项</Cell>

              <Cell
                description={
                  <Checkbox.Group type="button" shape="radius">
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>圆角</Cell>

              <Cell
                description={
                  <Checkbox.Group type="button" shape="round">
                    <Checkbox value="0">选项一</Checkbox>
                    <Checkbox value="1">选项二</Checkbox>
                    <Checkbox value="2">选项三</Checkbox>
                  </Checkbox.Group>
                }>椭圆角</Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="块级样式" />
            <Panel.Body className="block-box">
              <Checkbox.Group block type="button">
                <Checkbox value="0">选项一</Checkbox>
                <Checkbox value="1">选项二</Checkbox>
                <Checkbox value="2">选项三</Checkbox>
              </Checkbox.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="列表样式" />
            <Panel.Body>
              <Checkbox.Group type="cell">
                <Checkbox value="0">选项一</Checkbox>
                <Checkbox value="1">选项二</Checkbox>
                <Checkbox value="2" disabled>选项三（禁止选择）</Checkbox>
              </Checkbox.Group>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="列表样式禁用状态" />
            <Panel.Body>
              <Checkbox.Group disabled type="cell">
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
