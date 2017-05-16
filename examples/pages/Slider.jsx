import React, { Component } from 'react';

import Slider from '../../components/Slider/index';

export default class fff extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  render() {
    return (
      <div>
        <Slider
          min={0}                           // 数组的最小值
          max={100}                         // 数据最大值

                    // 默认值 若不在min和max区间内 则转为在区间内
                    // 若开启了range 则需要为数组 若非数组会自动转为数组 数组的第二个参数为max
          defaultValue={0}

                    // 每次的步长
          step={2}

                    // 是否开启双滑块区间
          range

                    // 是否开启输入框 当开启 range 的时候 只有一个输入框却要控制两个滑块 此时输入框会控制最近一次操作过的滑块 首次加载时候 控制的是第一个滑块
          input

          disabled={this.state.disabled}    // 是否禁用滑块

                    // 返回了当前的value 可能会为数字 也可能为数组
          onChange={(value) => {
            console.log(value);
          }}

                    // 是否在移动时候显示顶部的提示框 为函数时可以自定义内容
          tips={(value) => {
            return (`${value}元`);
          }}

                    // 是否开启只能移动到标尺的点上
          dots

                    // 标尺 有showLabel 则显示 底部的数值
                    // step 当标尺显示过于密集的时候 可以设置多少间隔显示一个标尺 当开启了data以后 此属性无效 默认值为5
                    // data 自定义标尺的数据
                    // format 自定义 标尺文字的显示内容;
                    // format 和 showLabel只要开启一个 则都会开启标尺下面的文字显示
          marks={{
            showLabel: false,
            step: 5,
            data: [34, 68, 98, 17, 9],
            format: (value) => {
              return (`${value}`);
            },
          }}
          />
      </div>
    );
  }
}
