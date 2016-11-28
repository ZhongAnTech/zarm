import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Lottery, Toast } from '../../components';

class LotteryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      option: [
        {id: 1, name: "小米手环", image: require('../images/lottery/item1.png')}, 
        {id: 2, name: "感谢参与", image: require('../images/lottery/item2.png')}, 
        {id: 3, name: "住院医疗险", image: require('../images/lottery/item3.png')},
        {id: 4, name: "爱奇艺会员", image: require('../images/lottery/item4.png')},
        {id: 5, name: "乐动力10元优惠券", image: require('../images/lottery/item5.png')},
        {id: 6, name: "再抽一次", image: require('../images/lottery/item6.png')},
        {id: 7, name: "小米体重秤", image: require('../images/lottery/item7.png')},
        {id: 8, name: "综合意外险", image: require('../images/lottery/item8.png')}
      ],
      toast: {
        visible: false,
        onMaskClick: () => {
          let toast = this.state.toast
          toast.visible = false
          this.setState({toast})
        }
      }
    }
    this.count = 2;
  }

  getRandom(min,max){  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
    return Math.floor(Math.random()*(max+1-min)+min)
  }

  render() {
    let { toast } = this.state;
    return (
      <div className="lottery-wrapper">
        <Lottery 
          bgUrl={require('../images/lottery/lottery-bg.png')}
          btnUrl={require('../images/lottery/pointer.png')}
          option={this.state.option}
          value={this.state.id}
          isStart={this.state.isStart}
          onStart={() => {
            if(this.count < 1) {
              toast.visible = true
              toast.children = '次数到了'
              this.setState({toast, isStart: false})
            }
            else{
              this.setState({
                id: this.getRandom(1, 8),
                isStart: true
              })
              this.count--;
            }
          }}
          onComplete={(name) => {
            toast.visible = true
            toast.children = name
            this.setState({
              isStart: false,
              toast
            })
          }}
          onError={() => {
            console.log('程序报错');
            
          }}
        />

        <Toast {...this.state.toast} />
      </div>
    )
  }
}

export default LotteryPage;
