import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
