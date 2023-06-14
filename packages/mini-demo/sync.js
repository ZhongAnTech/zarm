const chokidar = require('chokidar');
const fsExtra = require('fs-extra');

chokidar.watch('../../packages/zarm/src/**/demo/*mini.tsx').on('change', async (path) => {
  const dir = path.match(/[A-Z a-z]+/g);
  const componentName = dir[3];
  let content = await fsExtra.readFile(path, 'utf-8');
  const newContent = content.replace(
    /(\s*\/\*[\s\S][style placeholder]*?\*\/)/g,
    "\nimport './index.scss';",
  );
  try {
    const filePath = `src/pages/${componentName}/index.tsx`;
    fsExtra.ensureFileSync(filePath);
    await fsExtra.writeFile(filePath, newContent, 'utf-8');
  } catch (e) {
    console.log(e);
  }
});
