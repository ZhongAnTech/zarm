const path = require('path');
const shell = require('shelljs');

const svgDir = path.join(__dirname, '../svg');
const sketch = path.join(__dirname, '../assets/icons.sketch');
const SKETCH_TOOL_DIR = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool';

// extract svg from sketch
// should install sketchtool first
// install guide: https://developer.sketchapp.com/guides/sketchtool/
shell.exec(
  `${SKETCH_TOOL_DIR} export slices --formats=svg --overwriting=YES --save-for-web=YES --output=${svgDir} ${sketch}`,
);
