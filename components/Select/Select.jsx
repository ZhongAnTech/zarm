
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  render () {
    const { className, title, cancelText, okText, onMaskClick, onCancel, onOk, children, ...others } = this.props;
    const { isShow } = this.state;

    const classes = classnames({
      'ui-select'        : true,
      'ui-select-hidden' : !isShow,
      [className]        : !!className,
    });

    return (
      <div {...others} className={classes} onClick={onMaskClick}>
        <div className="ui-select-mask"></div>
        <div className="ui-select-inner" onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-select-header">
            <div className="ui-select-cancel" onClick={onCancel}>{cancelText}</div>
            <div className="ui-select-title">{title}</div>
            <div className="ui-select-submit" onClick={onOk}>{okText}</div>
          </div>
          <div className="ui-select-mask-top">
            <div className="ui-select-mask-bottom">
              <div className="ui-select-body">
                <div className="ui-select-selected"></div>
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

Select.propTypes = { 
  visible     : PropTypes.bool,
  title       : PropTypes.string,
  cancelText  : PropTypes.string,
  okText      : PropTypes.string,
  onMaskClick : PropTypes.func,
};

Select.defaultProps = {
  visible     : false,
  cancelText  : '取消',
  okText      : '确定',
  onMaskClick : function () {},
};

export default Select;

