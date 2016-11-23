import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const randomNum = function (smin, smax) {// 获取2个值之间的随机数
  var Range = smax - smin;
  var Rand = Math.random();
  return (smin + Math.round(Rand * Range));
};

let finished = true,
    angle = 0;

class Lottery extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      gift: ''
    }
  }

  componentDidMount() {
    this.refs.rotateArea.addEventListener('transitionend', () => {
      this.refs.rotateArea.style.transform = `rotate(${angle % 360}deg)`;
      this.refs.rotateArea.style.transition = "0s"; 
      finished = true;
      this.props.end(this.state.gift);
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.value);
    var res = this.findIndexOfArr(nextProps.value);
    this.props.option.forEach((item, index) => {
      if(item.id == res[0].id) {
        this.setState({
          gift: res[0].name
        })
        this.runLottery(index+1);
      }
    })
  }

  findIndexOfArr(id) {
    return this.props.option.filter((obj) => {
        return obj.id == id
      })
  }

  getRandom(min,max){  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
    return Math.floor(Math.random()*(max+1-min)+min)
  }

  runLottery(index) {
    if(!finished) {
      return false;
    }
    finished = false;

    angle = this.getRandom(4,6)*360-360/8*`${index - 0.5}`;

    this.refs.rotateArea.style.transform = `rotate(${angle}deg)`;
    this.refs.rotateArea.style.transition = `${this.props.duration}s`;

  }

  stopLottery(index) {
    this.props.end();
  }

  render() {

    let cls = classnames({
      "rotate-area" : 'true',
    })

    let rotateItem = [];
    for (let i = 1; i <= 8; i++) {
      rotateItem.push(<div key={i} style={{ backgroundImage: `url(${this.props.option[i-1].src})` }} className={`award-item award-item${i}`}></div>);
    }

    return (
      <div className="lottery-area">
        <div className={cls} ref="rotateArea">
          {rotateItem}
        </div>  
        <div 
          className="lottery-btn" 
          onClick={
            () => {
              this.props.start();
              
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
  start: PropTypes.func,
  end: PropTypes.func,
};

Lottery.defaultProps = {
  duration: 2,
  id: 0,
  start: () => {},
  end: () => {}
};


export default Lottery;
