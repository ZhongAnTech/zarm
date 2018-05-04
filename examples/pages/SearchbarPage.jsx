import React, { Component } from 'react';
import { Panel, SearchBar, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/SearchbarPage';

function alertSearch(item) {
  alert(`搜索内容为 ${item}`);
}
class Page extends Component {

  constructor() {
    super();
    this.state = {
      value: '默认关键字',
      value2: '',
    };
  }

  renderResult() {
    const { value2 } = this.state;
    return (
      <ul className="search-result">
        {value2 && value2.split('').map((item, index) => (
          <li role="presentation" key={+index} onClick={() => { alertSearch(item); }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

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
                // defaultValue="默认关键字"
                maxLength={10}
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
            <Panel.Header title="搜索按钮" />
            <Panel.Body>
              <div className="searchbar-wrap">
                <SearchBar
                  shape="round"
                  // disabled
                  defaultValue={this.state.value}
                  showCancel={false}
                  placeholder="搜索"
                  onSubmit={(value) => {
                    console.log(`搜索内容为${value}`);
                  }}
                  onFocus={() => {
                    console.log('获取焦点');
                  }}
                  onChange={(value) => {
                    console.log(value);
                    this.setState({
                      value,
                    });
                  }}
                  onBlur={() => {
                    console.log('失去焦点');
                  }}
                  onClear={() => {
                    console.log('点击了清除');
                    this.setState({
                      value: '',
                    });
                  }}
                  onCancel={() => {
                    console.log('点击了取消');
                  }}
                  ref={(ref) => { this.manualFocus = ref; }}
                />
                <Button theme="primary" size="sm" shape="radius" className="search-btn" onClick={() => { alert(`搜索内容是 ${this.state.value}`); }}>搜索</Button>
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="手动获取焦点" />
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

          <Panel>
            <Panel.Header title="搜索结果列表" />
            <Panel.Body>
              <div className="searchbar-wrap">
                <SearchBar
                  // disabled
                  showCancel={false}
                  placeholder="搜索"
                  onSubmit={(value) => {
                    console.log(`搜索内容为${value}`);
                  }}
                  onFocus={() => {
                    console.log('获取焦点');
                  }}
                  onChange={(value) => {
                    console.log(value);
                    this.setState({
                      value2: value,
                    });
                  }}
                  onBlur={() => {
                    console.log('失去焦点');
                  }}
                  onClear={() => {
                    console.log('点击了清除');
                    this.setState({
                      value2: '',
                    });
                  }}
                  onCancel={() => {
                    console.log('点击了取消');
                  }}
                />
                <Button theme="primary" size="sm" shape="radius" className="search-btn" onClick={() => { alert(`搜索内容是 ${this.state.value2}`); }}>搜索</Button>
              </div>
              {this.renderResult()}
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }

}

export default Page;
