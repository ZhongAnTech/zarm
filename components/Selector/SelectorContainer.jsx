
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class SelectorContainer extends Component {

  render () {
    const { visible, className, title, cancelText, okText, onMaskClick, onCancel, onOk, children, ...others } = this.props;

    const classes = classnames({
      'ui-selector-container' : true,
      'ui-selector-hidden'    : !visible,
      [className]           : !!className,
    });

    return (
      <div {...others} className={classes} onClick={onMaskClick}>
        <div className="ui-selector-mask"></div>
        <div className="ui-selector-inner" onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-selector-header">
            <div className="ui-selector-cancel" onClick={onCancel}>{cancelText}</div>
            <div className="ui-selector-title">{title}</div>
            <div className="ui-selector-submit" onClick={onOk}>{okText}</div>
          </div>
          <div className="ui-selector-mask-top">
            <div className="ui-selector-mask-bottom">
              <div className="ui-selector-body">
                <div className="ui-selector-selected"></div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onContainerClick(e) {
    e.stopPropagation();
  }
}

SelectorContainer.propTypes = { 
  visible     : PropTypes.bool,
  title       : PropTypes.string,
  cancelText  : PropTypes.string,
  okText      : PropTypes.string,
  onMaskClick : PropTypes.func,
};

SelectorContainer.defaultProps = {
  visible     : false,
  cancelText  : '取消',
  okText      : '确定',
  onMaskClick : function () {},
};

export default SelectorContainer;

