import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class TabContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('selected' in nextProps) {
      this.setState({
        selected: !!nextProps.selected,
      });
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      active: !!this.state.selected,
    });

    return (
      <div className={cls} role="tabpanel">
        {children}
      </div>
    );
  }
}

TabContainer.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

TabContainer.defaultProps = {
  prefixCls: 'zax-tab-container-item',
  className: null,
};

export default TabContainer;
