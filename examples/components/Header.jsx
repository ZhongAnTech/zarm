import React, { Component } from 'react';
import '../styles/components/Header.scss';

class Header extends Component {
  render() {
    const { title } = this.props;

    return (
      <header className="Header">
        {title}
      </header>
    );
  }
}

export default Header;
