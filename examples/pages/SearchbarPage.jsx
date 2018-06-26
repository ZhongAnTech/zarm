import React, { Component } from 'react';
import { Panel, SearchBar, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/SearchBarPage';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      value: '默认关键字',
      placeholder: '搜索',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: '默认关键字2',
        placeholder: '搜索你想购买的保险',
      });
    }, 0);
  }

  render() {
    return (
      <Container className="searchBar-page">
        <Header title="搜索框 SearchBar" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <SearchBar
                shape="round"
                cancelText="取消"
                placeholder={this.state.placeholder}
                showCancel={false}
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
            <Panel.Header title="始终展示取消按钮" />
            <Panel.Body>
              <SearchBar
                showCancel
                value={this.state.value}
                placeholder="搜索"
                onChange={(value) => {
                  console.log(value);
                  this.setState({
                    value,
                  });
                }}
                onClear={(value) => {
                  console.log('清除了 -> ', value);
                  this.setState({
                    value: '',
                  });
                }}
              />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="手动获取焦点" />
            <Panel.Body>
              <SearchBar
                shape="radius"
                cancelText="取消"
                placeholder="搜索"
                ref={(ref) => { this.manualFocus = ref; }}
              />
              <div className="button-wrap"><Button theme="primary" size="sm" shape="radius" onClick={() => { this.manualFocus.focus(); }}>点击获取焦点</Button></div>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
