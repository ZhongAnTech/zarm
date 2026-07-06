const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');
const { bundlesize } = require('../package.json');

const packageRoot = path.resolve(__dirname, '..');

const units = {
  B: 1,
  KB: 1000,
  MB: 1000 * 1000,
};

const parseSize = (value) => {
  const match = /^(\d+(?:\.\d+)?)\s*(B|KB|MB)$/i.exec(value);
  if (!match) {
    throw new Error(`Invalid bundle size limit: ${value}`);
  }
  return Number(match[1]) * units[match[2].toUpperCase()];
};

const formatSize = (bytes) => `${(bytes / 1000).toFixed(2)} kB`;

let failed = false;

bundlesize.forEach(({ path: filePath, maxSize }) => {
  const absolutePath = path.resolve(packageRoot, filePath);
  const actualSize = gzipSync(fs.readFileSync(absolutePath)).length;
  const maxBytes = parseSize(maxSize);
  const passed = actualSize <= maxBytes;

  // eslint-disable-next-line no-console
  console.log(
    `${passed ? '✓' : '✗'} ${filePath}: ${formatSize(actualSize)} / ${maxSize} (gzip)`,
  );

  failed ||= !passed;
});

if (failed) {
  process.exitCode = 1;
}
