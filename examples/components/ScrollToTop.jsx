import { Component } from 'react';

class ScrollToTop extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTop;
