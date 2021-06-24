import { getParameters } from 'codesandbox/lib/api/define';
import { pascalCase } from 'change-case';

export default ({ code, component, preview }) => {
  const title = `${component.name} ${pascalCase(component.key)} - Zarm Design`;
  const pageCls = `${component.key}-page`;

  let parsedSourceCode = code;
  let importReactContent = "import React from 'react';";

  const importReactReg = /import(\D*)from 'react';/;
  const matchImportReact = parsedSourceCode.match(importReactReg);
  if (matchImportReact) {
    [importReactContent] = matchImportReact;
    parsedSourceCode = parsedSourceCode.replace(importReactReg, '').trim();
  }

  parsedSourceCode = parsedSourceCode.replace('mountNode', "document.getElementById('container')");

  const indexJsContent = `
${importReactContent}
import ReactDOM from 'react-dom';
import 'zarm/dist/zarm.css';
import './index.css';
${parsedSourceCode}
`.trim();

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  </head>
  <body>
    <div class="${pageCls}" id="container" style="padding: 24px" />
  </body>
</html>`;

  const config = {
    files: {
      'package.json': {
        content: {
          title,
          main: 'index.js',
          dependencies: {
            zarm: 'latest',
            react: '^17',
            'react-dom': '^17',
            'react-scripts': '^4.0.0',
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
      'index.css': { content: '' },
      'index.js': { content: indexJsContent },
      'index.html': { content: htmlContent },
    },
  };

  if (component.style) {
    config.files['index.css'] = {
      // eslint-disable-next-line import/no-dynamic-require
      content: require(`!!raw-loader!sass-loader!@/demo/styles/${pascalCase(
        component.key,
      )}Page.scss`).default,
    };
  }

  const params = getParameters(config);

  return `<div class="code-preview">
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
    >
      <input type="hidden" name="parameters" value="${params}" />
      <button class="za-button za-button--default za-button--xs za-button--radius codesanbox" type="submit">在 CodeSandbox 中打开</button>
    </form>
    ${preview}
  </div>`;
};
