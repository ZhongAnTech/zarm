import React, { Component } from 'react';
import classnames from 'classnames';

class Container extends Component {
  // componentDidMount() {
  //   if (this.props.className !== 'index-page') return;

  //   const scrollTop = window.sessionStorage[this.props.className];
  //   if (scrollTop) {
  //     this.container.scrollTop = scrollTop;
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.props.className !== 'index-page') return;

  //   const { scrollTop } = this.container;
  //   window.sessionStorage[this.props.className] = scrollTop;
  // }

  render() {
    const { className, children, ...others } = this.props;
    const cls = classnames('app-container', className);

    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }
}

export default Container;
