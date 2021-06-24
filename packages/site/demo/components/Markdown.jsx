import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
// import { NavBar, Radio, Icon } from 'zarm';
import { useLocation } from 'react-router-dom';
import Context from '@/utils/context';
import Demo from './Demo';

export default (props) => {
  const globalContext = useContext(Context);
  const { content } = props;
  const components = new Map();
  const nodeList = [];

  if (typeof content !== 'string') return null;

  const renderDOM = () => {
    // eslint-disable-next-line
    for (const [id, component] of components) {
      const div = document.getElementById(id);
      nodeList.push(div);
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
  };

  useEffect(() => {
    renderDOM();

    return function cleanup() {
      nodeList.forEach((node) => {
        ReactDOM.unmountComponentAtNode(node);
      });
    };
  });

  // doc.replace(/<style>\s?([^]+?)(<\/style>)/g, (match, p1) => {
  //   style = p1;
  // });

  const html = marked(
    content
      .replace(/## 自定义 Iconfont 图标\s?([^]+)/g, '') // 排除无法展示示例的情况
      .replace(/## API\s?([^]+)/g, '') // 排除API显示
      .replace(/##\s?([^]+?)((?=##)|$)/g, (match, p1) => {
        const id = parseInt(Math.random() * 1e9, 10).toString(36);
        components.set(
          id,
          React.createElement(Demo, { ...props, globalContext, location: useLocation() }, p1),
        );
        return `<div id=${id}></div>`;
      }),
    {
      renderer: new marked.Renderer(),
    },
  );

  return (
    <main dangerouslySetInnerHTML={{ __html: html }} />
    //     <NavBar
    //   style={{ position: 'fixed', top: 0 }}
    //   title={`${data.name} ${data.description}`}
    //   left={leftControl}
    // />
  );
};
