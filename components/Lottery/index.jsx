import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

let finished = true;
let angle = 0;
let error = false;
let flag = true;

function _getRandom(min, max) {  // 参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
  return Math.floor((Math.random() * ((max + 1) - min)) + min);
}


function _addListenerMulti(el, s, fn) {
  const evts = s.split(' ');
  for (let i = 0, iLen = evts.length; i < iLen; i += 1) {
    el.addEventListener(evts[i], fn, false);
  }
}

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gift: '',
      isStart: props.isStart || false,
    };

    this.num = props.option.length;
  }

  componentDidMount() {
    _addListenerMulti(this.rotateArea, 'webkitTransitionEnd transitionend', () => {
      this._transitionend();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isStart) {
      flag = true;
      return;
    }
    this.num = nextProps.option.length;
    this.onStart(nextProps.value);
  }

  componentWillUnmount() {
    finished = true;
    flag = true;
  }

  // 完成
  onComplete(name) {
    this.setState({ isStart: false });
    this.props.onComplete(name);
  }

  // 开始
  onStart(value) {
    this.setState({ isStart: true });

    const res = this._findIndexOfArr(value);
    if (res.length === 0) {
      error = true;
      this._runLottery(0.5);
      return;
    }

    this.props.option.forEach((item, index) => {
      if (item.id === res[0].id) {
        error = false;
        this.setState({
          gift: res[0].name,
        });
        this._runLottery(index + 1);
      }
    });
  }

  // 出错
  onError() {
    this.setState({ isStart: false });
    this.props.onError();
  }

  _findIndexOfArr(id) {
    return this.props.option.filter((obj) => {
      return obj.id === id;
    });
  }

  _runLottery(index) {
    if (!finished) {
      return false;
    }
    finished = false;
    angle = (_getRandom(4, 6) * 360) - ((360 / `${this.num}`) * `${index - 0.5}`);

    this.rotateArea.style.webkitTransform = `rotate(${angle}deg)`;
    this.rotateArea.style.webkitTransition = `${this.props.duration}s`;
    this.rotateArea.style.transform = `rotate(${angle}deg)`;
    this.rotateArea.style.transition = `${this.props.duration}s`;
  }

    // 监听动画执行完成
  _transitionend() {
    this.rotateArea.style.transform = `rotate(${angle % 360}deg)`;
    this.rotateArea.style.transition = '0s';
    finished = true;
    flag = true;
    error ? this.onError()
          : this.onComplete(this.state.gift);
  }


  render() {
    const cls = classnames({
      'rotate-area': 'true',
    });

    const rotateItem = [];

    for (let i = 1; i <= this.num; i += 1) {
      rotateItem.push(
        <div
          key={i}
          style={{
            backgroundImage: `url(${this.props.option[i - 1].image})`,
            WebkitTransform: `rotate(${(360 / this.num) * (i - 0.5)}deg)`,
            transform: `rotate(${(360 / this.num) * (i - 0.5)}deg)`,
          }}
          className={`award-item award-item${i}`}
          />);
    }

    return (
      <div className="lottery-area">
        <div className={cls} ref={(rotateArea) => { this.rotateArea = rotateArea; }} style={{ backgroundImage: `url(${this.props.bgUrl})` }}>
          {rotateItem}
        </div>
        <div
          className="lottery-btn"
          style={{ backgroundImage: `url(${this.props.btnUrl})` }}
          onClick={
            () => {
              if (!flag) return;
              flag = false;
              this.props.onStart();
            }
          }
          />
      </div>
    );
  }
}

Lottery.propTypes = {
  option: PropTypes.arrayOf(PropTypes.object),
  duration: PropTypes.number,
  onStart: PropTypes.func,
  onComplete: PropTypes.func,
};

Lottery.defaultProps = {
  duration: 2,
  onStart: () => {},
  onComplete: () => {},
};


export default Lottery;
