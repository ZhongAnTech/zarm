const chokidar = require('chokidar');
const fsExtra = require('fs-extra');

let orderObj = fsExtra.readJsonSync('./order.json');

function computeName(blockName) {
  const className = blockName.split('-');
  return className.map((c) => `${c.charAt(0).toUpperCase()}${c.slice(1)}`).join('');
}

chokidar.watch('../../packages/zarm/src/**/demo/*.mini.tsx').on('change', async (pathDir) => {
  const dir = pathDir.match(/[A-Z a-z-]+/g);

  const demoName = dir[5];
  const componentName = dir[3];
  const content = await fsExtra.readFile(pathDir, 'utf-8');
  const match = /order:\s*(\d+)/.exec(content);

  const capitalizedName = computeName(demoName);
  if (orderObj?.[componentName]) {
    orderObj = {
      ...orderObj,
      [componentName]: {
        ...(orderObj?.[componentName] || {}),
        [capitalizedName]: match?.[1] ?? 0,
      },
    };
  } else {
    orderObj = {
      ...orderObj,
      [componentName]: {
        [capitalizedName]: match?.[1] ?? 0,
      },
    };
  }

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
    dirents.forEach(async (entry) => {
      const blockName = entry.name.split('.')[0];
      const className = blockName.split('-');
      const capitalized = className
        .map((c) => `${c.charAt(0).toUpperCase()}${c.slice(1)}`)
        .join('');
      imports.push(`import ${capitalized} from './component/${blockName}'`);
      components.push({
        order: orderObj?.[componentName]?.[capitalized] ?? 0,
        component: `<${capitalized} />`,
      });
    });
    components.sort((c1, c2) => c1.order - c2.order);

    const componentsStr = components.map((item) => item.component).join(`\n${space}`);
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
    fsExtra.writeJson('./order.json', orderObj);
  } catch (e) {
    console.log(e);
  }
});
