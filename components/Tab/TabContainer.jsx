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
      active: !!this.state.selected,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        {children}
      </div>
    );
  }
}

TabContainer.propTypes = {
  prefixCls: PropTypes.string,
};

TabContainer.defaultProps = {
  prefixCls: 'ui-tab-container-item',
};

export default TabContainer;
