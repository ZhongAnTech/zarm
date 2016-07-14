
import React, { Component, PropTypes } from 'react';
import Events from '../utils/events'

import '../styles/pages/App.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends Component {

  componentDidMount() {
    Events.on(window, 'resize', window.__setFontSize__)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children : PropTypes.element.isRequired,
  error    : PropTypes.object,
};

export default App;