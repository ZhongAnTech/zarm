
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Option from './Option';

class Picker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      translateY : 0,
      pointStart : 0,
      pointEnd   : 0,
      value      : props.value || props.defaultValue,
    };
  }

  componentDidMount() {
    this.onValueChange(this.state.value, 0);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
      this.onValueChange(nextProps.value, 300);
    }
  }

  // 选中指定值
  onValueChange(value, speed) {
    const { dataSource, valueMember } = this.props;
    let index = 0;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i][valueMember] === value) {
        index = i;
        break;
      }
    }
    this.onMoveTo(index, speed);
  }

  // 移动到指定编号
  onMoveTo(index, speed) {
    const itemHeight = this.getItemHeight();
    if (itemHeight === 0) {
      return;
    }

    const offset = - index * itemHeight;

    this.doTransition(offset, speed);
    this.setState({
      translateY  : offset,
    });
  }

  // 执行过渡动画
  doTransition(offset, duration) {
    const style = this.refs.picker.style;
    style.webkitTransitionDuration = duration + "ms";
    style.mozTransitionDuration = duration + "ms";
    style.oTransitionDuration = duration + "ms";
    style.transitionDuration = duration + "ms";
    style.webkitTransform = "translate3d(0, " + offset + "px, 0)";
    style.mozTransform = "translate3d(0, " + offset + "px, 0)";
    style.oTransform = "translate3d(0, " + offset + "px, 0)";
    style.transform = "translate3d(0, " + offset + "px, 0)";
  }

  onTouchStart(event) {
    const pointY = this.getPoint(event).y;
    this.setState({
      pointStart : pointY,
    });
  }

  onTouchMove(event) {
    event.preventDefault();
    document.body.addEventListener('touchmove', function(event) {

    }, {passive: true});

    const pointY = this.getPoint(event).y;
    const offset = this.state.translateY + (pointY - this.state.pointStart);

    this.doTransition(offset, 0);
    this.setState({
      pointEnd: pointY,
    });
  }

  onTouchEnd(event) {
    let offset = (this.state.pointEnd !== 0)
                 ? this.state.translateY + (this.state.pointEnd - this.state.pointStart)
                 : 0;
    let items = this.refs.picker.children;
    let itemHeight = items[0] && items[0].offsetHeight;
    let maxIndex = Math.abs(items.length - 1);
    let index = Math.round(offset / itemHeight);

    if (index > 0) {
      index = 0;
    } else {
      index = (Math.abs(offset) >= maxIndex * itemHeight)
            ? maxIndex
            : Math.abs(index);
    }

    this.onMoveTo(index, 300);

    const { dataSource, valueMember, onChange } = this.props;
    const value = dataSource[index][valueMember];

    console.log('value: ', value);
    this.setState({
      value
    });
    onChange && onChange(value);
  }

  getItemHeight() {
    const items = this.refs.picker.children;

    if (!items || items.length === 0) {
      return 0;
    }
    return items[0].offsetHeight;
  }

  // 获取触摸点的当前坐标
  getPoint(event) {
    const touch = event.touches[0];
    return {
      x: touch.pageX,
      y: touch.pageY,
    };
  }

  render () {
    const props = this.props;
    const { height, isDisabled, valueMember, displayMember, dataSource, ...others } = this.props;
    const options = dataSource.map((item, index) => {
      return <Option key={index} value={item[valueMember]}>{item[displayMember]}</Option>;
    });

    const cls = classnames({
      'ui-picker' : true,
      'disabled'    : 'disabled' in props || isDisabled
    });

    return (
      <div className={cls}
        style={{height: height}}
        onTouchStart={(event) => this.onTouchStart(event)}
        onTouchMove={(event) => this.onTouchMove(event)}
        onTouchEnd={(event) => this.onTouchEnd(event)}
        {...others}
        >
        <ul ref="picker">
          {options}
        </ul>
      </div>
    );
  }
}

Picker.propTypes = {
  onChange      : PropTypes.func,
  dataSource    : PropTypes.array,
  valueMember   : PropTypes.string,
  displayMember : PropTypes.string,
};

Picker.defaultProps = {
  onChange      : () => {},
  dataSource    : [],
  valueMember   : 'value',
  displayMember : 'label',
};

export default Picker;

