import React, { Component } from 'react';
import { Panel, SearchBar, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/SearchbarPage';

class Page extends Component {

  render() {
    return (
      <Container className="Searchbar-page">
        <Header title="搜索框 Searchbar" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <SearchBar
                shape="round"
                // disabled
                defaultValue="默认关键字"
                cancelText="取消"
                placeholder="搜索"
                onSubmit={(value) => {
                  console.log(`搜索内容为${value}`);
                }}
                onFocus={() => {
                  console.log('获取焦点');
                }}
                onChange={(value) => {
                  console.log(value);
                }}
                onBlur={() => {
                  console.log('失去焦点');
                }}
                onClear={() => {
                  console.log('点击了清除');
                }}
                onCancel={() => {
                  console.log('点击了取消');
                }}
              />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="通过按钮获取焦点" />
            <Panel.Body>
              <SearchBar
                shape="round"
                // disabled
                cancelText="取消"
                placeholder="搜索"
                onSubmit={(value) => {
                  console.log(`搜索内容为${value}`);
                }}
                onFocus={() => {
                  console.log('获取焦点');
                }}
                onChange={(value) => {
                  console.log(value);
                }}
                onBlur={() => {
                  console.log('失去焦点');
                }}
                onClear={() => {
                  console.log('点击了清除');
                }}
                onCancel={() => {
                  console.log('点击了取消');
                }}
                ref={(ref) => { this.manualFocus = ref; }}
              />
              <div className="button-wrap"><Button theme="primary" size="sm" shape="radius" onClick={() => { console.log(this.manualFocus); this.manualFocus.focus(); }}>点击获取焦点</Button></div>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }

}

export default Page;
