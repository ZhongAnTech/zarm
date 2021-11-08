import * as React from 'react';

interface TextStyle {
  /**
   * 设置字体颜色
   * @default #000
   */
  color?: React.CSSProperties['color'];
  /**
   * 设置字体大小
   * @default 14
   */
  fontSize?: number;
  /**
   * 设置字体粗细
   * @default 300
   */
  fontWeight?: React.CSSProperties['fontWeight'];
  /**
   * 规定字体样式
   * @default normal
   */
  fontStyle?: React.CSSProperties['fontSize'];
  /**
   * 设置水印文字的字体
   * @default sans-serif
   */
  fontFamily?: React.CSSProperties['fontFamily'];
  /**
   * 规定字体变体
   * @default normal
   */
  fontVariant?: React.CSSProperties['fontVariant'];
  /**
   * 水印文字的对齐方式
   * @default left
   */
  textAlign?: CanvasTextAlign;
  /**
   * 绘制文本的文本基线
   * @default alphabetic
   */
  textBaseline?: CanvasTextBaseline;
}

interface ImageStyle {
  /**
   * 图片宽度
   * @default 120
   */
  width?: number;
  /**
   * 图片高度
   * @default 64
   */
  height?: number;
}

interface MarkStyle {
  /**
   * 水印之间的水平间距
   * @default 24
   */
  gapX?: number;
  /**
   * 水印之间的垂直间距
   * @default 48
   */
  gapY?: number;
  /**
   * 水印在 canvas 画布上绘制的水平偏移量
   * @default 0
   */
  offsetLeft?: number;
  /**
   * 水印在 canvas 画布上绘制的垂直偏移量
   * @default 0
   */
  offsetTop?: number;
  /**
   * 单个水印宽度
   * @default 120
   */
  width?: number;
  /**
   * 单个水印高度
   * @default 64
   */
  height?: number;
  /**
   * 水印不透明度
   * @default 0.15
   */
  opacity?: number;
  /**
   * 旋转的角度
   * @default -22
   */
  rotate?: number;
  /**
   * 样式层级
   * @default 2000
   */
  zIndex?: number;
}

export interface BaseWaterMarkProps {
  /**
   * 展示模式，interval 表示错行展示
   * @default interval
   */
  mode?: 'repeat' | 'interval';
  /** 水印文本, 为数组时表示多行水印 */
  text?: string | string[];
  /** 文本样式 */
  textStyle?: TextStyle;
  /** 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 */
  image?: string;
  /** 图片样式 */
  imageStyle?: ImageStyle;
  /**  */
  markStyle?: MarkStyle;
  /**
   * 是否开启监视模式
   * @default true
   */
  monitor?: boolean;
}

export interface WaterMarkDrawResult {
  url: string;
  width: number;
  height: number;
  ratio: number;
}
