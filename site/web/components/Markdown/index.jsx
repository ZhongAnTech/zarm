import React, { useEffect } from 'react';
import { pascalCase } from 'change-case';
import marked from 'marked';
import Prism from 'prismjs';
import Meta from '@site/web/components/Meta';
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
    renderer.code = (code, language) => {
      return `<pre><code class="language-${language}">${Prism.highlight(code, Prism.languages[language], language)}</code></pre>`;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (typeof document === 'string') {
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
