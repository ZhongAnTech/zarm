const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../../bundle');
if (!fs.existsSync(bundlePath)) {
  fs.mkdirSync(bundlePath);
  fs.mkdirSync(`${bundlePath}/ios`);
  fs.mkdirSync(`${bundlePath}/android`);
}
