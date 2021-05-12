import fs from 'fs';
import path from 'path';
import { sync } from 'mkdirp';
import changeCase from 'change-case';
import chalk from 'chalk';
import signale from 'signale';
import { component, style, test } from './templates';

export interface ITemplateConfig {
  compName: string;
}

const write = (dir: string, code: string) => {
  fs.writeSync(fs.openSync(dir, 'w'), code);
};

export default ({ compName }: ITemplateConfig) => {
  const rootDir = `components/${changeCase.paramCase(compName)}`;
  const folder = {
    component: rootDir,
    style: `${rootDir}/style`,
    test: `${rootDir}/__tests__`,
  };

  const pages = {
    component: [
      { name: 'index.tsx', module: component.indexTemp(compName) },
      { name: 'demo.md', module: component.demoTemp(compName) },
      { name: `${compName}.tsx`, module: component.compTemp(compName) },
    ],
    style: [
      { name: 'index.tsx', module: style.indexTemp() },
      { name: 'index.scss', module: style.indexScssTemp(compName) },
    ],
    test: [{ name: 'index.test.jsx', module: test.indexTemp(compName) }],
  };

  Object.keys(pages).forEach((key) => {
    sync(folder[key]);
    pages[key].forEach((page) => {
      write(path.resolve(`./${folder[key]}`, page.name), page.module);
      console.info(`   ${chalk.green('create')} ${folder[key]}/${page.name}`);
    });
  });
  signale.success('create component templates successfully!!');
};
