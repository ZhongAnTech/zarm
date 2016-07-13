
import React, { Component, PropTypes } from 'react';
import '../styles/pages/App.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="App-container">
          {this.props.children}
        </div>
        {
          /* <Footer /> */
        }
      </div>
    );
  }
}

App.propTypes = {
  children : PropTypes.element.isRequired,
  error    : PropTypes.object,
};

export default App;