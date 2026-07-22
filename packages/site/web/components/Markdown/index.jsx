import { assets, documents } from '@/site.config';
import Context from '@/utils/context';
import Meta from '@/web/components/Meta';
import { pascalCase } from 'change-case';
import { marked, Renderer } from 'marked';
import Prism from 'prismjs';
import React, { useContext, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Icon, Tooltip } from 'zarm';
import CodePreview from './CodePreview';
import './style.scss';

const isComponentPage = (page) =>
  Object.values(documents)
    .flat()
    .findIndex((item) => item.key === page) === -1;

const isHooks = (key) => key.indexOf('use') === 0; // components key startsWith use

const Icons = Icon.createFromIconfont(assets.iconfont);

const escapeCode = (code) => Prism.util.encode(code);

const splitMarkdown = (html) => {
  const parts = [];
  const marker = /<!--code-preview:(\d+)-->/g;
  let lastIndex = 0;
  let match = marker.exec(html);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ html: html.slice(lastIndex, match.index), key: `html-${lastIndex}` });
    }
    parts.push({ previewIndex: Number(match[1]) });
    lastIndex = marker.lastIndex;
    match = marker.exec(html);
  }

  if (lastIndex < html.length) {
    parts.push({ html: html.slice(lastIndex), key: `html-${lastIndex}` });
  }

  return parts;
};

const renderMarkdown = (source, componentPage) => {
  const previews = [];
  const renderer = new Renderer();

  renderer.table = (header, body) =>
    `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  renderer.code = (code, language) => {
    const normalizedLanguage = language || 'text';
    if (componentPage) {
      const index = previews.push({ code, language: normalizedLanguage }) - 1;
      return `<!--code-preview:${index}-->`;
    }

    const grammar = Prism.languages[normalizedLanguage];
    const highlightedCode = grammar
      ? Prism.highlight(code, grammar, normalizedLanguage)
      : escapeCode(code);
    return `<pre class="language-${normalizedLanguage}">${highlightedCode}</pre>`;
  };
  renderer.heading = (text, level) => (level === 1 ? '' : `<h${level}>${text}</h${level}>`);

  const html = marked.parse(source, { renderer });
  return { parts: splitMarkdown(html), previews };
};

const MarkdownContent = ({ className, component, content }) => {
  return (
    <div className={className}>
      {content.parts.map((part) => {
        if (part.html !== undefined) {
          return <div dangerouslySetInnerHTML={{ __html: part.html }} key={part.key} />;
        }

        const preview = content.previews[part.previewIndex];
        return preview ? (
          <CodePreview
            {...preview}
            component={component}
            key={`${component.key}-${part.previewIndex}`}
          />
        ) : null;
      })}
    </div>
  );
};

export default (props) => {
  const intl = useIntl();
  const { document, component } = props;
  const { locale } = useContext(Context);
  const componentPage = isComponentPage(component.key);
  const markdownDocument = typeof document === 'string' ? document : '';
  const demoSource = markdownDocument.replace(/## API\s?([^]+)/g, '');
  const api = markdownDocument.match(/## API\s?([^]+)/g);
  const apiSource = Object.prototype.toString.call(api) === '[object Array]' ? api[0] : '';
  const demoContent = useMemo(
    () => renderMarkdown(demoSource, componentPage),
    [componentPage, demoSource],
  );
  const apiContent = useMemo(
    () => renderMarkdown(apiSource, componentPage),
    [apiSource, componentPage],
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (typeof document === 'string') {
    const title = componentPage
      ? `${locale === 'zhCN' ? component.name : ''} ${
          !isHooks(component.key) ? pascalCase(component.key) : component.key
        }`
      : intl.formatMessage({ id: `app.docs.article.${component.key}` });

    const pageCls = `${component.key}-page`;
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
                <Icons type="edit" />
              </a>
            </Tooltip>
          </h1>
          <MarkdownContent className="demo" component={component} content={demoContent} />
          <MarkdownContent className="api" component={component} content={apiContent} />
        </div>
      </>
    );
  }

  return <span />;
};
