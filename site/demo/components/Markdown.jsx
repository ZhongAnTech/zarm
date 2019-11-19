import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
// import { NavBar, Radio, Icon } from 'zarm';
import Demo from './Demo';
import Container from './Container';
import Footer from './Footer';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    // this.style = null;
    this.components = new Map();
    this.nodeList = [];
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  componentWillUnmount() {
    this.nodeList.forEach((node) => {
      ReactDOM.unmountComponentAtNode(node);
    });
  }

  renderDOM() {
    // eslint-disable-next-line
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }

    // 加载样式
    // const head = document.getElementsByTagName('head')[0];
    // const style = document.createElement('style');
    // style.type = 'text/css';
    // style.appendChild(document.createTextNode(this.style));
    // head.appendChild(style);
  }

  render() {
    const { document, component } = this.props;
    if (typeof document === 'string') {
      this.components.clear();

      // document.replace(/<style>\s?([^]+?)(<\/style>)/g, (match, p1) => {
      //   this.style = p1;
      // });

      const html = marked(
        document
          .replace(/## 自定义 Iconfont 图标\s?([^]+)/g, '') // 排除无法展示示例的情况
          .replace(/## API\s?([^]+)/g, '') // 排除API显示
          .replace(/##\s?([^]+?)((?=##)|$)/g, (match, p1) => {
            const id = parseInt(Math.random() * 1e9, 10).toString(36);
            this.components.set(id, React.createElement(Demo, this.props, p1));
            return `<div id=${id}></div>`;
          }),
        {
          renderer: new marked.Renderer(),
        },
      );

      // const leftControl = (
      //   <Icon
      //     type="arrow-left"
      //     theme="success"
      //     onClick={() => window.history.back()}
      //   />
      // );

      // const rightControl = (
      //   <Radio.Group type="button">
      //     <Radio value="zh_CN">中文</Radio>
      //     <Radio value="en_US">EN</Radio>
      //   </Radio.Group>
      // );

      return (
        <Container className={`${component.key}-page`}>
          <main dangerouslySetInnerHTML={{ __html: html }} />
          {/* <NavBar
            style={{ position: 'fixed', top: 0 }}
            title={`${data.name} ${data.description}`}
            left={leftControl}
          /> */}
          <Footer />
        </Container>
      );
    }

    return <span />;
  }
}
