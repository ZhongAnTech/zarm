
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import addEndEventListener from './utils/animationEvents';

class Picker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow         : false,
      animationState : 'leave',
      translateY     : 0,
      pointStart     : 0,
      pointEnd       : 0,
    };
  }

  componentDidMount() {
    this.animationEvents = addEndEventListener(this.refs.picker, this.animationEnd.bind(this));

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
    let node = this.refs.picker;
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

  // 移动到指定编号
  _onMoveTo(dom, px, speed) {
    const lis = dom.querySelectorAll('li'),
          liHeight = lis[0].offsetHeight,
          index = Math.round(px / liHeight);

    if (px > 0 || Math.abs(px) >= (lis.length - 1) * liHeight) {
      return;
    }
    const moveY = index * liHeight;

    this._doTransition(dom, moveY, speed);

    dom.querySelector('input').value = lis[Math.abs(index)].getAttribute('data-value');

    this.setState({
      activeIndex : index,
      translateY  : moveY,
    });
  }

  // 执行过渡动画
  _doTransition(dom, offset, duration) {
    const style = dom.querySelector('ul').style;
    style.webkitTransitionDuration = duration + "ms";
    style.mozTransitionDuration = duration + "ms";
    style.oTransitionDuration = duration + "ms";
    style.transitionDuration = duration + "ms";
    style.webkitTransform = "translate3d(0, " + offset + "px, 0)";
    style.mozTransform = "translate3d(0, " + offset + "px, 0)";
    style.oTransform = "translate3d(0, " + offset + "px, 0)";
    style.transform = "translate3d(0, " + offset + "px, 0)";
  }

  _onTouchStart(event) {
    event.preventDefault();
    
    const dom = event.currentTarget,
          lis = dom.querySelectorAll('li');
    if (!lis[0]) {
      return;
    }

    const touch = event.touches[0];
    this.setState({ 
      pointStart : touch.pageY,
    });
  }

  _onTouchMove(event) {
    event.preventDefault();

    const dom = event.currentTarget,
          pointY = this._getCurrentPoint(event),
          px = this.state.translateY + (pointY - this.state.pointStart);

    const lis = dom.querySelectorAll('li'),
          liHeight = lis[0].offsetHeight;

    console.log(lis.length)
    if (px > 0 || Math.abs(px) >= (lis.length - 1) * liHeight) {
      return;
    }

    this._doTransition(dom, px, 0);
    this.setState({
      pointEnd: pointY,
    });
  }

  _onTouchEnd(event) {
    const dom = event.currentTarget,
          px = (this.state.pointEnd !== 0)
             ? this.state.translateY + (this.state.pointEnd - this.state.pointStart)
             : 0;
    this._onMoveTo(dom, px, 300);
  }

  _getCurrentPoint(event, type) {
    const touch = (type == 'mouse')
              ? event
              : event.touches[0];
    return touch.pageY;
  }

  render () { 
    const { visible, input, animationType, animationDuration, data, className, onMaskClick, children, ...others } = this.props;
    const { isShow, animationState } = this.state;

    let slider = [],
        d = data;

    for (let i = 0; i < input.length; i++) {
      const options = d.map((result, index) => {
        return <li key={index} data-value={result.value}>{result.name}</li>;
      });
      d = d[0].children;
      slider.push(
        <div className="ui-picker-group" key={i}
          onTouchStart={(event) => this._onTouchStart(event)}
          onTouchMove={(event) => this._onTouchMove(event)}
          onTouchEnd={(event) => this._onTouchEnd(event)}>
          <input type="hidden" name={input[i]} />
          <ul>
            {options}
          </ul>
        </div>
      );
    };

    const classes = {
      picker:  classnames({
                'ui-picker'                : true,
                ['fade-' + animationState] : true,
              }),
      wrapper: classnames({
                'ui-picker-wrapper'          : true,
                ['moveUp-' + animationState] : true,
              })
    }

    const style = {
      picker: {
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
      style.picker.display = 'none';
    }

    return (
      <div className={classes.picker} style={style.picker} onClick={onMaskClick}>
        <div className={classes.wrapper} style={style.wrapper} ref="picker" onClick={this._onContainerClick}>
          <div className="ui-picker-header">
            <span><a href="">取消</a></span>
            <span><a href="">确定</a></span>
          </div>
          <div className="ui-picker-body">
            <div className="ui-picker-dialog" {...others}>
              <p></p>
              {slider}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

Picker.propTypes = { 
  visible           : PropTypes.bool,
  animationType     : PropTypes.oneOf(['fade', 'door', 'flip', 'rotate', 'zoom', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']),
  animationDuration : PropTypes.number,
  onMaskClick       : PropTypes.func,
};

Picker.defaultProps = {
  visible           : false,
  animationType     : 'slideUp',
  animationDuration : 300,
  onMaskClick       : function () {},
};

export default Picker;