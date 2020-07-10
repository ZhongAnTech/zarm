import React from 'react';
import { pascalCase } from 'change-case';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';
import Meta from '@site/web/components/Meta';

import 'highlight.js/styles/github-gist.css';
import './style.scss';

export default (props) => {
  const { document, component } = props;

  const getRenderer = () => {
    const renderer = new marked.Renderer();

    // 表格
    renderer.table = (header, body) => {
      return `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    };

    // 代码
    // highlightjs对jsx解析还不完善，自闭合标签会破坏高亮显示，暂未解决。
    // https://github.com/highlightjs/highlight.js/issues/1646
    renderer.code = (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && hljs.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? hljs.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    // 标题
    // renderer.heading = (text, level) => {
    //   const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    //   return `
    //     <h${level}>
    //       <a name="${escapedText}" class="anchor" href="#${escapedText}">
    //         <span class="header-link">#</span>
    //       </a>
    //       ${text}
    //     </h${level}>`;
    // };

    return renderer;
  };

  if (typeof document === 'string') {
    hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
    hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
    hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));

    const demoHTML = marked(document.replace(/## API\s?([^]+)/g, ''), { renderer: getRenderer() });
    const api = document.match(/## API\s?([^]+)/g);
    const apiHTML = marked(Object.prototype.toString.call(api) === '[object Array]' ? api[0] : '', { renderer: getRenderer() });
    const title = `${component.name} ${pascalCase(component.key)} - Zarm Design`;

    return (
      <>
        <Meta title={title} description={component.description || component.name} />
        <div className={`${component.key}-page`}>
          <div className="demo" dangerouslySetInnerHTML={{ __html: demoHTML }} />
          <div className="api" dangerouslySetInnerHTML={{ __html: apiHTML }} />
        </div>
      </>
    );
  }

  return <span />;
};
