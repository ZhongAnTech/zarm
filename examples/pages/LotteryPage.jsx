import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Lottery } from '../../components';

import item1 from '../images/lottery/item1.png';
import item2 from '../images/lottery/item2.png';
import item3 from '../images/lottery/item3.png';
import item4 from '../images/lottery/item4.png';
import item5 from '../images/lottery/item5.png';
import item6 from '../images/lottery/item6.png';
import item7 from '../images/lottery/item7.png';
import item8 from '../images/lottery/item8.png';

import '../styles/pages/LotteryPage';

class LotteryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      option: [
        {id: 1, name: "小米手环", src: item1}, 
        {id: 2, name: "感谢参与", src: item2}, 
        {id: 3, name: "众安住院医疗险", src: item3},
        {id: 4, name: "爱奇艺会员", src: item4},
        {id: 5, name: "乐动力10元优惠券", src: item5},
        {id: 6, name: "再抽一次", src: item6},
        {id: 7, name: "小米体重秤", src: item7},
        {id: 8, name: "众安综合意外险", src: item8}
      ]
    }
  }

  getRandom(min,max){  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
    return Math.floor(Math.random()*(max+1-min)+min)
  }

  render() {
    return (
      <div className="lottery-wrapper">
        <Lottery 
          option = {this.state.option}
          value = {this.state.id}
          start = {() => {
            this.setState({
              id: this.getRandom(1,8)
            })
          }}
          end = {(name) => {
            alert(name);
          }}
        />
      </div>
    )
  }
}

export default LotteryPage;
