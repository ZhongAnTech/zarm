const Enzyme = require('enzyme');
const Adapter =
  process.env.REACT === '16'
    ? require('enzyme-adapter-react-16')
    : require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });
