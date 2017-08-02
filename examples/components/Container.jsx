import React, { Component } from 'react';
import classnames from 'classnames';
import '../styles/components/Container';

class Container extends Component {

  render() {
    const { className, children } = this.props;

    const cls = classnames({
      'app-container': true,
      [className]: !!className,
    });

    return (
      <div className={cls} style={{ minHeight: window.innerHeight }}>
        {children}
      </div>
    );
  }
}

export default Container;
