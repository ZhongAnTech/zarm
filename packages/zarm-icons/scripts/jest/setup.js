const Enzyme = require('enzyme');
const Adapter =
  process.env.REACT === '16'
    ? require('enzyme-adapter-react-16')
    : require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, 'SVGRect', { value: 'SVGRect', writable: true });
// module.exports = async () => {
//   // ...
//   // Set reference to mongod in order to close the server during teardown.
//   global.SVGRect = 'SVGRect';
// };
