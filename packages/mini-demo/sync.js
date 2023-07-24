const chokidar = require('chokidar');
const fsExtra = require('fs-extra');

chokidar.watch('../../packages/zarm/src/**/demo/*.mini.tsx').on('change', async (path) => {
  const dir = path.match(/[A-Z a-z-]+/g);

  console.error(dir, dir[5]);
  const demoName = dir[5];
  const componentName = dir[3];
  const content = await fsExtra.readFile(path, 'utf-8');
  //   // const newContent = content.replace(
  //   //   /(\s*\/\*[\s\S][style placeholder]*?\*\/)/g,
  //   //   "\nimport './index.scss';",
  //   // );

  const space = ' '.repeat(6);

  try {
    const componentPath = `src/pages/${componentName}/component/${demoName}.tsx`;
    fsExtra.ensureFileSync(componentPath);
    await fsExtra.writeFile(componentPath, content, 'utf-8');

    const dirents = await fsExtra.readdir(`src/pages/${componentName}/component`, {
      withFileTypes: true,
    });

    const imports = [];
    const components = [];
    dirents.forEach((entry) => {
      const blockName = entry.name.split('.')[0];
      const componentName = blockName.split('-');
      const capitalized = componentName
        .map((c) => `${c.charAt(0).toUpperCase()}${c.slice(1)}`)
        .join('');
      imports.push(`import ${capitalized} from './component/${blockName}'`);
      components.push(`<${capitalized} />`);
    });

    const componentsStr = components.join(`\n${space}`);
    const template = `
import * as React from 'react';
${imports.join(';\n')};

import './index.scss';

export default () => {
  return (
    <>
      ${componentsStr}
    </>
  )
}`;

    const fileFath = `src/pages/${componentName}/index.tsx`;
    fsExtra.ensureFileSync(fileFath);
    await fsExtra.writeFile(fileFath, template, 'utf-8');
  } catch (e) {
    console.log(e);
  }
});
