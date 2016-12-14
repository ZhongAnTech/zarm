import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

let finished = true,
    angle = 0,
    error = false,
    flag = true;

class Lottery extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      gift: '',
      isStart: props.isStart || false
    }
  }

  componentDidMount() {
    this._addListenerMulti(this.refs.rotateArea, 'webkitTransitionEnd transitionend', () => {
      this._transitionend()
    });
  }

  _addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
      el.addEventListener(evts[i], fn, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isStart) {
      flag = true;
      return;
    }

    this.onStart(nextProps.value)
  }

  componentWillUnmount(){
    finished = true;
    flag = true;
  }

  _findIndexOfArr(id) {
    return this.props.option.filter((obj) => {
        return obj.id == id
      })
  }

  _getRandom(min,max){  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
    return Math.floor(Math.random()*(max+1-min)+min)
  }

  _runLottery(index) {
    if(!finished) {
      return false;
    }
    finished = false;
    angle = this._getRandom(4,6)*360-360/8*`${index - 0.5}`;
    this.refs.rotateArea.style.webkitTransform = `rotate(${angle}deg)`;
    this.refs.rotateArea.style.webkitTransition = `${this.props.duration}s`;
    this.refs.rotateArea.style.transform = `rotate(${angle}deg)`;
    this.refs.rotateArea.style.transition = `${this.props.duration}s`;
  }

  // 监听动画执行完成
  _transitionend() {
    this.refs.rotateArea.style.transform = `rotate(${angle % 360}deg)`;
    this.refs.rotateArea.style.transition = "0s"; 
    finished = true;
    flag = true;
    error ? this.onError()
          : this.onComplete(this.state.gift)
  }

  // 开始
  onStart(value) {
    this.setState({ isStart: true })

    var res = this._findIndexOfArr(value);
    if(res.length == 0) {
      error = true;
      this._runLottery(0.5);
      return ;
    }

    this.props.option.forEach((item, index) => {
      if(item.id == res[0].id) {
        error = false;
        this.setState({
          gift: res[0].name
        })
        this._runLottery(index+1);
      }
    })
  }

  // 出错
  onError() {
    this.setState({ isStart: false })
    this.props.onError()
  }

  // 完成
  onComplete(name) {
    this.setState({ isStart: false })
    this.props.onComplete(name)
  }

  render() {

    let cls = classnames({
      "rotate-area" : 'true',
    })

    let rotateItem = [];
    for (let i = 1; i <= 8; i++) {
      rotateItem.push(<div key={i} style={{ backgroundImage: `url(${this.props.option[i-1].image})` }} className={`award-item award-item${i}`}></div>);
    }

    return (
      <div className="lottery-area">
        <div className={cls} ref="rotateArea" style={{ backgroundImage: `url(${this.props.bgUrl})` }}>
          {rotateItem}
        </div>  
        <div 
          className="lottery-btn" 
          style={{ backgroundImage: `url(${this.props.btnUrl})` }}
          onClick={
            () => {
              if(!flag) return;
                  flag = false;
              
              this.props.onStart();
            }
          }

        >
        </div>
      </div>
    )
  }
}

Lottery.propTypes = {
  option: PropTypes.array,
  duration: PropTypes.number,
  id: PropTypes.number,
  onStart: PropTypes.func,
  onComplete: PropTypes.func,
};

Lottery.defaultProps = {
  duration: 2,
  onStart: () => {},
  onComplete: () => {}
};


export default Lottery;
