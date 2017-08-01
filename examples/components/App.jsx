import React, { Component } from 'react';
// import Eruda from 'eruda';
// import Events from '../utils/events';

// page styles
import '../styles/core/index';
import '../styles/components/App';

// components styles
import '../../styles/index';

class App extends Component {

  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // Eruda.init();
  }

  render() {
    return (
      <div>
        <div className="app-container">
          {this.props.children}
        </div>
        <footer>
          <div className="copyright">
            <div className="copyright-cn">众安·体验设计中心</div>
            <div className="copyright-en">Zhongan UX Densign</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
