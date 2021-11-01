const dekko = require('dekko');
const chalk = require('chalk');

dekko('dist')
  .isDirectory()
  .hasFile('zarm.css')
  .hasFile('zarm.min.css')
  .hasFile('zarm.js')
  .hasFile('zarm.min.js');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `dist` directory is valid.'));
