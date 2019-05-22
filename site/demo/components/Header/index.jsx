import React, { Component } from 'react';
import './style.scss';

class Header extends Component {
  render() {
    const { title } = this.props;

    return (
      <header className="header">
        {title}
      </header>
    );
  }
}

export default Header;
