import { CheckOutlined, SnippetsOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { Project } from '@stackblitz/sdk';
import stackblitzSdk from '@stackblitz/sdk';
import { Alert, Badge, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'dumi';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import LZString from 'lz-string';
import Prism from 'prismjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { PreviewerProps } from '.';
import { useLocation, useThemeConfig } from '../../../hooks';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePenIcon from '../../common/CodePenIcon';
import CodePreview from '../../common/CodePreview';
import CodeSandboxIcon from '../../common/CodeSandboxIcon';
import ExternalLinkIcon from '../../common/ExternalLinkIcon';
import { SiteContext, SiteContextProps } from '../../slots/SiteContext';

const { ErrorBoundary } = Alert;

function toReactComponent(jsonML: any) {
  return toReactElement(jsonML, [
    [
      (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
      (node: any, index: any) => {
        // ref: https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/bisheng-plugin-highlight/lib/browser.js#L7
        const attr = JsonML.getAttributes(node);
        return React.createElement(
          'pre',
          {
            key: index,
            className: `language-${attr.lang}`,
          },
          React.createElement('code', {
            dangerouslySetInnerHTML: { __html: attr.highlighted },
          }),
        );
      },
    ],
  ]);
}

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

const CodePreviewer: React.FC<PreviewerProps> = (props) => {
  const {
    asset,
    iframe,
    demoUrl,
    children,
    title,
    description,
    originDebug,
    jsx,
    style,
    version,
    clientOnly,
    pkgDependencyList,
  } = props;

  const themeConfig = useThemeConfig();
  const location = useLocation();

  const entryCode = asset.dependencies['index.tsx'].value;

  const liveDemo = useRef<React.ReactNode>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const codepenIconRef = useRef<HTMLFormElement>(null);
  const [copyTooltipOpen, setCopyTooltipOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<string>('tsx');
  const { theme } = useContext<SiteContextProps>(SiteContext);

  const { hash } = location;

  const highlightedCodes = {
    // jsx: Prism.highlight(jsx, Prism.languages.javascript, 'jsx'),
    tsx: Prism.highlight(entryCode, Prism.languages.javascript, 'jsx'),
  };

  const highlightedStyle = style ? Prism.highlight(style, Prism.languages.css, 'css') : '';

  const handleCodeCopied = (demo: string) => {
    setCopied(true);
  };

  const onCopyTooltipOpenChange = (open: boolean) => {
    setCopyTooltipOpen(open);
    if (open) {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (asset.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, []);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;

  if (!liveDemo.current) {
    liveDemo.current = iframe ? (
      <BrowserFrame>
        <iframe
          src={demoUrl}
          height={iframe === true ? undefined : iframe}
          title="demo"
          className="iframe-demo"
        />
      </BrowserFrame>
    ) : (
      mergedChildren
    );
  }

  const codeBoxClass = classNames('code-box expand', {
    'code-box-debug': originDebug,
  });

  const localizedTitle = title;
  const introChildren = <div dangerouslySetInnerHTML={{ __html: description }} />;

  const html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
        </head>
        <body>
          <div id="container" style="padding: 24px" />
          <script>const mountNode = document.getElementById('container');</script>
        </body>
      </html>
    `;

  const tsconfig = {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      esModuleInterop: true,
      moduleResolution: 'node',
      jsx: 'react',
      jsxFactory: 'React.createElement',
      jsxFragmentFactory: 'React.Fragment',
    },
  };

  const suffix = codeType === 'tsx' ? 'tsx' : 'js';

  const dependencies: Record<PropertyKey, string> = jsx.split('\n').reduce(
    (acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches && matches[1] && !line.includes('zarm')) {
        const paths = matches[1].split('/');
        if (paths.length) {
          const dep = paths[0].startsWith('@') ? `${paths[0]}/${paths[1]}` : paths[0];
          acc[dep] = 'latest';
        }
      }
      return acc;
    },
    { antd: themeConfig.version },
  );

  dependencies['@ant-design/icons'] = 'latest';

  if (suffix === 'tsx') {
    dependencies['@types/react'] = '^18.0.0';
    dependencies['@types/react-dom'] = '^18.0.0';
  }

  dependencies.react = '^18.0.0';
  dependencies['react-dom'] = '^18.0.0';

  const codepenPrefillConfig = {
    title: `${localizedTitle} - zarm@${dependencies.zarm}`,
    html,
    js: `const { createRoot } = ReactDOM;\n${jsx
      .replace(/import\s+(?:React,\s+)?{(\s+[^}]*\s+)}\s+from\s+'react'/, `const { $1 } = React;`)
      .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'zarm';/, 'const { $1 } = zarm;')
      .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'@ant-design\/icons';/, 'const { $1 } = icons;')
      .replace("import React from 'react';", '')
      .replace(/import\s+{\s+(.*)\s+}\s+from\s+'react-router';/, 'const { $1 } = ReactRouter;')
      .replace(
        /import\s+{\s+(.*)\s+}\s+from\s+'react-router-dom';/,
        'const { $1 } = ReactRouterDOM;',
      )
      .replace(/([A-Za-z]*)\s+as\s+([A-Za-z]*)/, '$1:$2')
      .replace(
        /export default/,
        'const ComponentDemo =',
      )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
    editors: '001',
    css: '',
    js_external: [
      'react@18/umd/react.development.js',
      'react-dom@18/umd/react-dom.development.js',
      'dayjs@1/dayjs.min.js',
      `zarm@${themeConfig.version}/dist/zarm.min.js`,
      `@ant-design/icons/dist/index.umd.js`,
      'react-router-dom/dist/umd/react-router-dom.production.min.js',
      'react-router/dist/umd/react-router.production.min.js',
    ]
      .map((url) => `https://unpkg.com/${url}`)
      .join(';'),
    js_pre_processor: 'typescript',
  };

  const riddlePrefillConfig = {
    title: `${localizedTitle} - zarm@${dependencies.zarm}`,
    js: `${
      /import React(\D*)from 'react';/.test(jsx) ? '' : `import React from 'react';\n`
    }import { createRoot } from 'react-dom/client';\n${jsx.replace(
      /export default/,
      'const ComponentDemo =',
    )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
    css: '',
    json: JSON.stringify({ name: 'zarm-demo', dependencies }, null, 2),
  };

  // Reorder source code
  let parsedSourceCode = suffix === 'tsx' ? entryCode : jsx;
  let importReactContent = "import React from 'react';";
  const importReactReg = /import React(\D*)from 'react';/;
  const matchImportReact = parsedSourceCode.match(importReactReg);
  if (matchImportReact) {
    [importReactContent] = matchImportReact;
    parsedSourceCode = parsedSourceCode.replace(importReactReg, '').trim();
  }
  const demoJsContent = `
${importReactContent}
import './index.css';
${parsedSourceCode}
    `.trim();
  const indexCssContent = (style || '')
    .trim()
    .replace(new RegExp(`#${asset.id}\\s*`, 'g'), '')
    .replace('</style>', '')
    .replace('<style>', '');

  const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);
  `;

  const codesandboxPackage = {
    title: `${localizedTitle} - zarm@${dependencies.zarm}`,
    main: 'index.js',
    dependencies: {
      ...dependencies,
      'rc-util': pkgDependencyList['rc-util'],
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      'react-scripts': '^5.0.0',
    },
    devDependencies: {
      typescript: '^5.0.2',
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead'],
  };

  const codesanboxPrefillConfig = {
    files: {
      'package.json': { content: codesandboxPackage },
      'index.css': { content: indexCssContent },
      [`index.${suffix}`]: { content: indexJsContent },
      [`demo.${suffix}`]: { content: demoJsContent },
      'index.html': {
        content: html,
      },
    },
  };

  const stackblitzPrefillConfig: Project = {
    title: `${localizedTitle} - zarm@${dependencies.zarm}`,
    template: 'create-react-app',
    dependencies,
    description: '',
    files: {
      'index.css': indexCssContent,
      [`index.${suffix}`]: indexJsContent,
      [`demo.${suffix}`]: demoJsContent,
      'index.html': html,
    },
  };

  if (suffix === 'tsx') {
    stackblitzPrefillConfig.files['tsconfig.json'] = JSON.stringify(tsconfig, null, 2);
  }

  const backgroundGrey = theme.includes('dark') ? '#303030' : '#f0f2f5';

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={asset.id}>
      <div className="code-box-source">
        {/* <section className="code-box-demo" style={codeBoxDemoStyle}>
        <ErrorBoundary>
          <React.StrictMode>{liveDemo.current}</React.StrictMode>
        </ErrorBoundary>
      </section> */}
        <section className="code-box-meta markdown">
          {/* <div className="code-box-title">
          <Tooltip title={originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
            <a href={`#${asset.id}`} ref={anchorRef}>
              {localizedTitle}
            </a>
          </Tooltip>
          <EditButton title={<FormattedMessage id="app.content.edit-demo" />} filename={filename} />
        </div> */}
          {description && <div className="code-box-description">{introChildren}</div>}
          <Space className="code-box-actions" size="middle" wrap>
            <form
              className="code-box-code-action"
              action="https://codesandbox.io/api/v1/sandboxes/define"
              method="POST"
              target="_blank"
              ref={codeSandboxIconRef}
              onClick={() => {
                codeSandboxIconRef.current?.submit();
              }}
            >
              <input
                type="hidden"
                name="parameters"
                value={compress(JSON.stringify(codesanboxPrefillConfig))}
              />
              <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
                <CodeSandboxIcon className="code-box-codesandbox" />
              </Tooltip>
            </form>
            <form
              className="code-box-code-action"
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
              ref={codepenIconRef}
              onClick={() => {
                codepenIconRef.current?.submit();
              }}
            >
              <ClientOnly>
                <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
              </ClientOnly>
              <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
                <CodePenIcon className="code-box-codepen" />
              </Tooltip>
            </form>
            <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
              <span
                className="code-box-code-action"
                onClick={() => {
                  stackblitzSdk.openProject(stackblitzPrefillConfig, {
                    openFile: [`demo.${suffix}`],
                  });
                }}
              >
                <ThunderboltOutlined className="code-box-stackblitz" />
              </span>
            </Tooltip>

            <CopyToClipboard text={entryCode} onCopy={() => handleCodeCopied(asset.id)}>
              <Tooltip
                open={copyTooltipOpen as boolean}
                onOpenChange={onCopyTooltipOpenChange}
                title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
              >
                {React.createElement(copied && copyTooltipOpen ? CheckOutlined : SnippetsOutlined, {
                  className: 'code-box-code-copy code-box-code-action',
                })}
              </Tooltip>
            </CopyToClipboard>
          </Space>
        </section>
        <section className="highlight-wrapper" key="code">
          <CodePreview
            codes={highlightedCodes}
            toReactComponent={toReactComponent}
            onCodeTypeChange={(type) => setCodeType(type)}
          />
          {highlightedStyle ? (
            <div key="style" className="highlight">
              <pre>
                <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
              </pre>
            </div>
          ) : null}
        </section>
      </div>
      <div className="code-box-device">
        <div className="code-box-device-viewport">
          <ErrorBoundary>
            <React.StrictMode>{liveDemo.current}</React.StrictMode>
          </ErrorBoundary>
        </div>
        <Space className="code-box-device-actions" align="end">
          <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
            <a className="code-box-device-action" target="_blank" rel="noreferrer" href={demoUrl}>
              <ExternalLinkIcon className="code-box-separate" />
            </a>
          </Tooltip>
        </Space>
      </div>
    </section>
  );

  useEffect(() => {
    // In Safari, if style tag be inserted into non-head tag,
    // it will affect the rendering ability of the browser,
    // resulting in some response delays like following issue:
    // https://github.com/ant-design/ant-design/issues/39995
    // So we insert style tag into head tag.
    if (!style) return;
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = style;
    styleTag['data-demo-url'] = demoUrl;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [style, demoUrl]);

  if (version) {
    return (
      <Badge.Ribbon text={version} color={version.includes('<') ? 'red' : null}>
        {codeBox}
      </Badge.Ribbon>
    );
  }

  return codeBox;
};

export default CodePreviewer;
