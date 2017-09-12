import { Component, Children } from 'react';
// import Eruda from 'eruda';
// import Events from '../utils/events';

import '../styles/index';  // page styles

class App extends Component {

  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // Eruda.init();
  }

  render() {
    return this.props.children ? Children.only(this.props.children) : null;
  }
}

export default App;
