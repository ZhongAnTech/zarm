const fs = require('fs');
const path = require('path');

const iosDir = path.join(__dirname, '../../examples-rn/ios/bundle');
if (!fs.existsSync(iosDir)) {
  fs.mkdirSync(iosDir);
}

const androidDir = path.join(__dirname, '../../examples-rn/android/bundle');
if (!fs.existsSync(androidDir)) {
  fs.mkdirSync(androidDir);
}
