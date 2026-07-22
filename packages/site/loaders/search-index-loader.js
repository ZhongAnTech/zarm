const fs = require('fs');
const path = require('path');
const MiniSearch = require('minisearch');
const tokenize = require('../search/tokenize');
const siteConfig = require('../site.config');
const zarmPackage = require('../../zarm/package.json');

const CURRENT_VERSION = `${zarmPackage.version.split('.')[0]}.x`;

const LEGACY_COMPONENTS = [
  ['activity-indicator', 'ActivityIndicator 活动指示器'],
  ['back-to-top', 'BackToTop 返回顶部'],
  ['cell', 'Cell 列表项'],
  ['drag', 'Drag 拖拽'],
  ['locale-provider', 'LocaleProvider 国际化'],
  ['stack-picker', 'StackPicker 层叠选择器'],
];

const flatten = (groups) => Object.values(groups).flat();

const resolveSource = (source) => {
  if (source.startsWith('zarm/')) {
    return path.resolve(__dirname, '../../zarm/src', source.slice('zarm/'.length));
  }
  if (source.startsWith('@zarmDir/')) {
    return path.resolve(__dirname, '../../zarm', source.slice('@zarmDir/'.length));
  }
  if (source.startsWith('@/')) {
    return path.resolve(__dirname, '..', source.slice('@/'.length));
  }
  throw new Error(`Unsupported search document source: ${source}`);
};

const plainText = (markdown) =>
  markdown
    .replace(/^---[\s\S]*?---/m, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[^\n]*\n?/g, ' ')
    .replace(/[`#>*_|~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getTitle = (markdown, fallback) => {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return plainText(heading ? heading[1] : fallback);
};

const getSummary = (content) => {
  const summary = content.slice(0, 180);
  return summary.length < content.length ? `${summary}…` : summary;
};

const createCurrentDocuments = (loader) => {
  const documents = flatten(siteConfig.documents).map((item) => ({ ...item, type: 'doc' }));
  const components = flatten(siteConfig.components).map((item) => ({ ...item, type: 'component' }));

  return [...documents, ...components].map((item) => {
    const sourcePath = resolveSource(item.source);
    loader.addDependency(sourcePath);
    const markdown = fs.readFileSync(sourcePath, 'utf8');
    const content = plainText(markdown);
    const title = getTitle(markdown, item.name || item.key);

    return {
      id: `current:${item.type}:${item.key}`,
      title,
      content,
      keywords: `${item.key} ${item.name || ''}`,
      summary: getSummary(content.replace(title, '').trim()),
      type: item.type,
      version: CURRENT_VERSION,
      url: `#/${item.type === 'doc' ? 'docs' : 'components'}/${item.key}`,
    };
  });
};

const createLegacyDocuments = () =>
  ['2.x', '1.x'].flatMap((version) =>
    LEGACY_COMPONENTS.map(([key, title]) => ({
      id: `${version}:component:${key}`,
      title,
      content: `${title} Zarm ${version} 历史版本 旧组件`,
      keywords: `${key} legacy old 历史 旧版`,
      summary: `该组件仅在 Zarm ${version} 文档中提供`,
      type: 'component',
      version,
      url: `https://${version[0]}x.zarm.design/#/components/${key}`,
    })),
  );

module.exports = function searchIndexLoader() {
  this.cacheable();

  const search = new MiniSearch({
    fields: ['title', 'content', 'keywords'],
    idField: 'id',
    storeFields: ['title', 'summary', 'type', 'version', 'url'],
    tokenize,
  });
  const documents = [...createCurrentDocuments(this), ...createLegacyDocuments()];
  search.addAll(documents);

  return `export default ${JSON.stringify({ index: JSON.stringify(search) })};`;
};
