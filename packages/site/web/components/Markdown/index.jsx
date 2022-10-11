import React, { useEffect, useContext } from 'react';
import { pascalCase } from 'change-case';
import { marked } from 'marked';
import Prism from 'prismjs';
import { Icon } from 'zarm';
import { Tooltip } from 'zarm-web';
import { FormattedMessage, useIntl } from 'react-intl';
import Context from '@/utils/context';
import Meta from '@/web/components/Meta';
import { documents } from '@/site.config';
import Codesanbox from './Codesanbox';
import './style.scss';

const isComponentPage = (page) =>
  Object.values(documents)
    .flat()
    .findIndex((item) => item.key === page) === -1;
const isHooks = (key) => key.indexOf('use') === 0; // components key startsWith use
const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_mk657pke2hj.js');

export default (props) => {
  const intl = useIntl();
  const { document, component } = props;
  const { locale } = useContext(Context);

  const renderer = {
    table: (header, body) => {
      return `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    },
    code: (code, language) => {
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
    },
    heading: (text, level) => {
      if (level === 1) return '';
      return `<h${level}>${text}</h${level}>`;

      // const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      // return `
      //   <h${level}>
      //     <a name="${escapedText}" class="anchor" href="#${escapedText}">
      //       <span class="header-link">#</span>
      //     </a>
      //     ${text}
      //   </h${level}>`;
    },
  };
  marked.use({ renderer });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (typeof document === 'string') {
    const title = isComponentPage(component.key)
      ? `${locale === 'zhCN' ? component.name : ''} ${
          !isHooks(component.key) ? pascalCase(component.key) : component.key
        }`
      : intl.formatMessage({ id: `app.docs.article.${component.key}` });

    const pageCls = `${component.key}-page`;
    const demoHTML = marked(document.replace(/## API\s?([^]+)/g, ''));
    const api = document.match(/## API\s?([^]+)/g);
    const apiHTML = marked(Object.prototype.toString.call(api) === '[object Array]' ? api[0] : '');
    const sourceURL = `https://github.com/ZhongAnTech/zarm/blob/master/${component.source
      .replace('zarm/', 'packages/zarm/src/')
      .replace('@zarmDir/', 'packages/zarm/')
      .replace('@/', 'packages/site/')}`;

    return (
      <>
        <Meta
          title={`${title} - Zarm Design`}
          description={component.description || component.name}
        />
        <div className={pageCls}>
          <h1>
            {title}
            &nbsp;
            <Tooltip
              visible
              content={<FormattedMessage id="app.home.components.action.edit" />}
              direction="right"
            >
              <a alt="#" href={sourceURL} rel="noreferrer" target="_blank">
                <Icons type="edit" size="sm" />
              </a>
            </Tooltip>
          </h1>
          <div className="demo" dangerouslySetInnerHTML={{ __html: demoHTML }} />
          <div className="api" dangerouslySetInnerHTML={{ __html: apiHTML }} />
        </div>
      </>
    );
  }

  return <span />;
};
