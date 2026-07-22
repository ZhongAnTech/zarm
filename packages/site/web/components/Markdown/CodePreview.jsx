import { assets } from '@/site.config';
import pkg from '@zarmDir/package.json';
import { pascalCase } from 'change-case';
import LZString from 'lz-string';
import Prism from 'prismjs';
import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Icon, Tooltip } from 'zarm';

const Icons = Icon.createFromIconfont(assets.iconfont);

const getParameters = (parameters) =>
  LZString.compressToBase64(JSON.stringify(parameters))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const highlight = (code, language) => {
  const grammar = Prism.languages[language];
  return grammar ? Prism.highlight(code, grammar, language) : Prism.util.encode(code);
};

const getStyleCodes = (component) => {
  if (!component.style) {
    return { compiledStyleCode: '', sourceStyleCode: '' };
  }

  // eslint-disable-next-line import/no-dynamic-require
  const sourceStyleCode = require(`!!raw-loader!@/demo/styles/${pascalCase(
    component.key,
  )}Page.scss`).default;
  // eslint-disable-next-line import/no-dynamic-require
  const compiledStyleCode = require(`!!raw-loader!sass-loader!@/demo/styles/${pascalCase(
    component.key,
  )}Page.scss`).default;

  return { compiledStyleCode, sourceStyleCode };
};

const createSandboxParameters = ({ code, component, language, styleCode }) => {
  const title = `${component.name} ${pascalCase(component.key)} - Zarm Design`;
  const pageCls = `${component.key}-page`;
  const sourceCode = code.replace(/\bmountNode\b/g, "document.getElementById('container')");
  const hasReactImport = /import\s+(?:React(?:\s*,|\s+from)|\*\s+as\s+React\s+from)/.test(
    sourceCode,
  );
  const sourceLanguage = ['ts', 'tsx', 'typescript'].includes(language) ? 'tsx' : 'js';
  const indexFilename = `index.${sourceLanguage}`;
  const reactImport = hasReactImport ? '' : "import React from 'react';\n";
  const reactDOMRender =
    sourceLanguage === 'tsx'
      ? 'const ReactDOM = { render: (node: React.ReactNode, container: Element | DocumentFragment) => createRoot(container).render(node) };'
      : 'const ReactDOM = { render: (node, container) => createRoot(container).render(node) };';
  const indexContent = `
${reactImport}import { createRoot } from 'react-dom/client';
import 'zarm/react19';
import 'zarm/dist/zarm.css';
import './index.css';
${reactDOMRender}
${sourceCode}
`.trim();

  return getParameters({
    files: {
      'package.json': {
        content: {
          title,
          main: indexFilename,
          dependencies: {
            zarm: pkg.version,
            react: '19.2.7',
            'react-dom': '19.2.7',
            'react-scripts': '^5.0.0',
          },
          devDependencies: {
            typescript: '^4.0.5',
          },
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test --env=jsdom',
            eject: 'react-scripts eject',
          },
        },
      },
      'index.css': { content: styleCode },
      [indexFilename]: { content: indexContent },
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  </head>
  <body>
    <div class="${pageCls}" id="container" style="padding: 24px"></div>
  </body>
</html>`,
      },
    },
  });
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      // Use the fallback below when clipboard permission is unavailable.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const CodePreview = ({ code, component, language = 'jsx' }) => {
  const intl = useIntl();
  const copiedTimer = useRef();
  const [activeTab, setActiveTab] = useState('source');
  const [copied, setCopied] = useState(false);
  const { compiledStyleCode, sourceStyleCode } = useMemo(
    () => getStyleCodes(component),
    [component],
  );
  const sourceLanguage = language || 'jsx';
  const tabs = useMemo(
    () => [
      {
        key: 'source',
        label: sourceLanguage.toUpperCase(),
        language: sourceLanguage,
        code,
      },
      ...(sourceStyleCode
        ? [
            {
              key: 'style',
              label: 'SCSS',
              language: 'scss',
              code: sourceStyleCode,
            },
          ]
        : []),
    ],
    [code, sourceLanguage, sourceStyleCode],
  );
  const currentTab = tabs.find((tab) => tab.key === activeTab) || tabs[0];
  const parameters = useMemo(
    () => createSandboxParameters({ code, component, language, styleCode: compiledStyleCode }),
    [code, compiledStyleCode, component, language],
  );

  React.useEffect(
    () => () => {
      window.clearTimeout(copiedTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    await copyText(currentTab.code);
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  const copyTitle = intl.formatMessage({
    id: copied ? 'app.components.preview.action.copied' : 'app.components.preview.action.copy',
  });
  const codesandboxTitle = intl.formatMessage({
    id: 'app.components.preview.action.codesandbox',
  });

  return (
    <div className="code-preview">
      <div className="code-preview__header">
        <div className="code-preview__tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.key}
              className={`code-preview__tab${activeTab === tab.key ? ' is-active' : ''}`}
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCopied(false);
              }}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="code-preview__actions">
          <form
            action="https://codesandbox.io/api/v1/sandboxes/define"
            method="POST"
            target="_blank"
          >
            <input name="parameters" type="hidden" value={parameters} />
            <Tooltip arrowPointAtCenter content={codesandboxTitle} direction="top" trigger="hover">
              <button aria-label={codesandboxTitle} className="code-preview__action" type="submit">
                <Icons size="sm" type="codesandbox" />
              </button>
            </Tooltip>
          </form>
          <Tooltip arrowPointAtCenter content={copyTitle} direction="top" trigger="hover">
            <button
              aria-label={copyTitle}
              className={`code-preview__action${copied ? ' is-copied' : ''}`}
              onClick={handleCopy}
              type="button"
            >
              <Icons size="sm" type="copy" />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="code-preview__content" role="tabpanel">
        <pre
          className={`language-${currentTab.language}`}
          dangerouslySetInnerHTML={{
            __html: highlight(currentTab.code, currentTab.language),
          }}
        />
      </div>
    </div>
  );
};

export default CodePreview;
