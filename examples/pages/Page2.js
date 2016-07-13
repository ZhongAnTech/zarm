
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Page2 extends Component {

  render() {
    return (
      <div>
        <p>This is Page2</p>
        <p><Link to="/page1">=> Goto Page1</Link></p>
        <p><a href="#" onClick={() => { this.props.history.goBack() }}>GoBack</a></p>
      </div>
    );
  }
}

export default Page2;