
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import addEndEventListener from '../utils/animationEvents';

class Selector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow         : false,
      animationState : 'leave',
    };
  }

  componentDidMount() {
    this.animationEvents = addEndEventListener(this.refs.dialog, this.animationEnd.bind(this));

    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillUnmount() {
    if (this.animationEvents) {
      this.animationEvents.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  animationEnd(e) {
    let node = this.refs.dialog;
    if (e && e.target !== node) {
      return;
    }

    if (this.state.animationState === 'leave') {
      this.setState({
        isShow: false
      });
    }
  }

  enter() {
    this.setState({
      isShow: true,
      animationState: 'enter',
    });
  }

  leave() {
    if (this.animationEvents) {
      this.setState({
        animationState: 'leave',
      });
    } else {
      this.setState({
        isShow: false,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.isShow || nextState.isShow);
  }

  _onContainerClick(e) {
    e.stopPropagation();
  }

  render () {
    const { visible, animationType, animationDuration, className, onMaskClick, children, ...others } = this.props;
    const { isShow, animationState } = this.state;

    const classes = {
      selector:  classnames({
                'ui-selector'              : true,
                ['fade-' + animationState] : true,
                [className]                : className,
              }),
      wrapper: classnames({
                'ui-selector-wrapper'                      : true,
                [animationType + '-' + animationState] : true,
              })
    }

    const style = {
      selector: {
        WebkitAnimationDuration : animationDuration + 'ms',
        MozAnimationDuration    : animationDuration + 'ms',
        msAnimationDuration     : animationDuration + 'ms',
        OAnimationDuration      : animationDuration + 'ms',
        animationDuration       : animationDuration + 'ms',
      },
      wrapper: {
        WebkitAnimationDuration : animationDuration + 'ms',
        MozAnimationDuration    : animationDuration + 'ms',
        msAnimationDuration     : animationDuration + 'ms',
        OAnimationDuration      : animationDuration + 'ms',
        animationDuration       : animationDuration + 'ms',
      }
    };

    if (!isShow) {
      style.selector.display = 'none';
    }

    return (
      <div className={classes.selector} style={style.selector} onClick={onMaskClick}>
        <div className={classes.wrapper} ref="dialog" style={style.wrapper} {...others} onClick={this._onContainerClick}>
          <div className="ui-selector-header">
            <span><a href="">取消</a></span>
            <span><a href="">确定</a></span>
          </div>
          <div className="ui-selector-mask-top">
            <div className="ui-selector-mask-bottom">
              <div className="ui-selector-dialog" {...others}>
                <div className="ui-selector-selected"></div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Selector.propTypes = { 
  visible           : PropTypes.bool,
  animationType     : PropTypes.oneOf([
                        'fade', 'door', 'flip', 'rotate', 'zoom',
                        'moveUp','moveDown', 'moveLeft', 'moveRight',
                        'slideUp', 'slideDown', 'slideLeft', 'slideRight'
                      ]),
  animationDuration : PropTypes.number,
  onMaskClick       : PropTypes.func,
};

Selector.defaultProps = {
  visible           : false,
  animationType     : 'slideUp',
  animationDuration : 300,
  onMaskClick       : function () {},
};

export default Selector;

