import chalk from 'chalk';
import { paramCase } from 'change-case';
import fs from 'fs';
import { sync } from 'mkdirp';
import path from 'path';
import signale from 'signale';
import { component, style, test } from './templates';

export interface ITemplateConfig {
  compName: string;
}

const write = (dir: string, code: string) => {
  fs.writeSync(fs.openSync(dir, 'w'), code);
};

export default ({ compName }: ITemplateConfig) => {
  const rootDir = `src/${paramCase(compName)}`;
  const folder = {
    component: rootDir,
    style: `${rootDir}/style`,
    test: `${rootDir}/__tests__`,
  };

  const pages = {
    component: [
      { name: 'index.ts', module: component.indexTpl(compName) },
      { name: 'interface.ts', module: component.interfaceTpl(compName) },
      { name: 'demo.md', module: component.demoTpl(compName) },
      { name: `${compName}.tsx`, module: component.compTpl(compName) },
    ],
    style: [
      { name: 'index.ts', module: style.indexTpl() },
      { name: 'index.scss', module: style.indexScssTpl(compName) },
    ],
    test: [{ name: 'index.test.tsx', module: test.indexTpl(compName) }],
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
