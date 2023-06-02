/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import commander from 'commander';
import path from 'path';
import build from './build';
import deploy from './deploy';
import development from './development';
import template from './template';
import test from './test';

const { version } = require(path.resolve('./package.json'));

commander.version(version);

commander
  .command('build')
  .description('打包编译仓库')
  .option('-m, --mode <es|lib|umd|umd-ugly|native>', '选择打包模式')
  .option('-p, --path <path>', '源文件目录')
  .option('-o, --out-file <path>', '输出文件')
  .option('-d, --out-dir <path>', '输出目录')
  // .option('-z, --out-zip <path>', '输出zip压缩包存放目录')
  .option('-e, --ext <ext>', '要匹配的文件格式', '.ts,.tsx')
  .option('-l, --library-name <libraryName>', '包名')
  .option('-c, --copy-files', '拷贝不参与编译的文件')
  .option('-a, --analyzer', '是否启用分析器')
  .option('--build-css', '是否编译组件样式')
  .action(build);

commander
  .command('dev')
  .description('运行开发环境')
  .option('-m, --mode <mode>', '编译模式')
  .option('-h, --host <host>', '站点主机地址', '0.0.0.0')
  .option('-p, --port <port>', '站点端口号', '3000')
  .action(development);

commander
  .command('deploy')
  .description('部署官网站点')
  .option('-p, --push-gh', '是否发布至gh-pages')
  .option('-d, --out-dir <path>', '输出目录', 'dist')
  .option('-a, --analyzer', '是否启用分析器')
  .action(deploy);

commander
  .command('test')
  .description('执行单元测试脚本')
  .option('-m, --mode <mode>', '编译模式')
  .option('-u, --update-snapshot', '是否更新快照')
  .option('-c, --coverage', '是否生成覆盖率报告')
  .option('-s, --setupFilesAfterEnv <file>', '测试前装载的脚本文件')
  .option(
    '-o, --onlyChanged',
    '试图根据当前存储库中更改的文件确定要运行哪些测试。只有当你在git/hg存储库中运行测试，并且需要静态依赖关系图时才有效',
  )
  .action(test);

commander
  .command('add')
  .description('新增组件模板')
  .action(() => template({ compName: commander.args[1] }));

commander.parse(process.argv);

if (!commander.args[0]) {
  commander.help();
}
