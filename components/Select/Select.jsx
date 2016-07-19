
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow         : false,
      isPending      : false,
      animationState : 'leave',
    };

    this.resolveAnimationFrame = this.resolveAnimationFrame.bind(this);
  }

  componentWillUpdate() {
    setTimeout(this.resolveAnimationFrame, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.isShow || nextState.isShow);
  }

  render () {
    const { className, title, onMaskClick, onCancel, onOk, children, ...others } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const classes = classnames({
      'ui-select'        : true,
      'ui-select-hidden' : !isShow,
      [className]        : !!className,
    })

    return (
      <div {...others} className={classes} onClick={onMaskClick}>
        <div className="ui-select-mask"></div>
        <div className="ui-select-inner" onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-select-header">
            <div className="ui-select-cancel" onClick={onCancel}>取消</div>
            <div className="ui-select-title">{title}</div>
            <div className="ui-select-submit" onClick={onOk}>确定</div>
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

  resolveAnimationFrame() {
    if (this.state.animationState === 'leave') {
      this.setState({
        isShow: false,
        isPending: false
      });
    } else {
      this.setState({
        isShow: true,
        isPending: false
      });
    }
  }

  enter() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  leave() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'leave',
    });
  }

  onContainerClick(e) {
    e.stopPropagation();
  }
}

Select.propTypes = { 
  visible     : PropTypes.bool,
  title       : PropTypes.string,
  onMaskClick : PropTypes.func,
};

Select.defaultProps = {
  visible     : false,
  onMaskClick : function () {},
};

export default Select;

