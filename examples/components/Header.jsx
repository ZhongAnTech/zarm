import React, { Component } from 'react';
import ScrollToTop from './ScrollToTop';
import '../styles/components/Header.scss';

class Header extends Component {

  render() {
    const { title } = this.props;

    return (
      <header className="Header">
        <ScrollToTop />
        {title}
      </header>
    );
  }
}

export default Header;
