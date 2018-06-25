/**
 * discription: 倒计时
 * author: renwangyu
 * date: 2016.11.02
 */

/**
 * todo 是否在 zarm 组件增加引用；调整方法名；增加 demo；
 *
 * initialTimeRemaining: 初始化倒计时时间
 * interval：心跳间隔时间
 * textStyle：文本样式（rn 使用）
 * onCompleteCallback：倒计时结束调用
 * onTickCallback：实时获取倒计时时间
 * onFormatFunc：格式化文本显示
 */
export default interface PropsType {
  initialTimeRemaining?: number;
  interval?: number;
  className?: string;
  textStyle?: any;
  onCompleteCallback?: () => void;
  onTickCallback?: (time?: any) => void;
  onFormatFunc?: (time?: any) => void;
}
