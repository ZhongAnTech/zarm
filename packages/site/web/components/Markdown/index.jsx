import React, { useEffect } from 'react';
import { pascalCase } from 'change-case';
import marked from 'marked';
import Prism from 'prismjs';
import Meta from '@/web/components/Meta';
import { documents } from '@/site.config';
import Codesanbox from './Codesanbox';
import './style.scss';

const isComponentPage = (page) => documents.findIndex((item) => item.key === page) === -1;

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
      const highlightCode =
        Object.keys(Prism.languages).indexOf(language) > -1
          ? Prism.highlight(code, Prism.languages[language], language)
          : code;

      if (!isComponentPage(component.key)) {
        return `<pre><code class="language-${language}">${highlightCode}</code></pre>`;
      }

      return Codesanbox({
        code,
        component,
        preview: `<pre><code class="language-${language}">${highlightCode}</code></pre>`,
      });
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
    const title = `${component.name} ${pascalCase(component.key)} - Zarm Design`;
    const pageCls = `${component.key}-page`;
    const demoHTML = marked(document.replace(/## API\s?([^]+)/g, ''), { renderer: getRenderer() });
    const api = document.match(/## API\s?([^]+)/g);
    const apiHTML = marked(Object.prototype.toString.call(api) === '[object Array]' ? api[0] : '', {
      renderer: getRenderer(),
    });

    return (
      <>
        <Meta title={title} description={component.description || component.name} />
        <div className={pageCls}>
          <div className="demo" dangerouslySetInnerHTML={{ __html: demoHTML }} />
          <div className="api" dangerouslySetInnerHTML={{ __html: apiHTML }} />
        </div>
      </>
    );
  }

  return <span />;
};
