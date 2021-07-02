import { ContainerType } from '../utils/dom';

export interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number;

  /**
   * 距离窗口底部达到指定偏移量后触发
   */
  offsetBottom?: number;

  /**
   * 设置 Affix 需要监听滚动事件的元素
   */
  scrollContainer?: ContainerType;

  /**
   * 固定状态改变时出发的回调函数
   *
   * @param affixed 是否固定
   */
  onChange?(affixed: boolean): void;
}
