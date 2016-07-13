
import React, { Component, PropTypes } from 'react';

class SelectorGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      translateY     : 0,
      pointStart     : 0,
      pointEnd       : 0,
    };
  }

  componentDidMount() {
    // this._onMoveTo(0, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this._onMoveTo(0, 300);
      const value = nextProps.data[0];
      value.index = 0;
      this.props.onChange && this.props.onChange(value);
    }
  }


  // 移动到指定编号
  _onMoveTo(offset, speed) {    
    const items = this.refs.selector.querySelectorAll('li'),
          itemHeight = items[0].offsetHeight,
          index = Math.round(offset / itemHeight);

    if (offset > 0 || Math.abs(offset) >= (items.length - 1) * itemHeight) {
      return;
    }

    const moveY = index * itemHeight,
          value = this.props.data[Math.abs(index)];

    this._doTransition(moveY, speed);
    value.index = Math.abs(index);
    this.props.onChange && this.props.onChange(value);

    this.setState({
      translateY  : moveY,
    });
  }

  // 执行过渡动画
  _doTransition(offset, duration) {
    const style = this.refs.selector.style;
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
    const pointY = this._getPoint(event).y;
    this.setState({ 
      pointStart : pointY,
    });
  }

  _onTouchMove(event) {
    event.preventDefault();

    const pointY = this._getPoint(event).y,
          offset = this.state.translateY + (pointY - this.state.pointStart),
          items = this.refs.selector.querySelectorAll('li'),
          itemHeight = items[0].offsetHeight;

    if (offset > 0 || Math.abs(offset) >= (items.length - 1) * itemHeight) {
      return;
    }

    this._doTransition(offset, 100);
    this.setState({
      pointEnd: pointY,
    });
  }

  _onTouchEnd(event) {
    const px = (this.state.pointEnd !== 0)
             ? this.state.translateY + (this.state.pointEnd - this.state.pointStart)
             : 0;
    this._onMoveTo(px, 100);
  }

  // 获取触摸点的当前坐标
  _getPoint(event) {
    const touch = event.touches[0];
    return { 
      x: touch.pageX,
      y: touch.pageY,
    }
  }

  render () {
    const { name, data, ...others } = this.props;

    const options = data.map((result, index) => {
      return <li key={index}>{result.name}</li>;
    });

    return (
      <div className="ui-selector-group"
        onTouchStart={(event) => this._onTouchStart(event)}
        onTouchMove={(event) => this._onTouchMove(event)}
        onTouchEnd={(event) => this._onTouchEnd(event)}>
        <ul ref="selector">
          {options}
        </ul>
      </div>
    );
  }

}

SelectorGroup.propTypes = { 
  name : PropTypes.string,
};

// SelectorGroup.defaultProps = {
// };

export default SelectorGroup;

