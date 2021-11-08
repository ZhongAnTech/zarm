import * as React from 'react';
import type { BaseWaterMarkProps, WaterMarkDrawResult } from './interface';
import { isString } from '../utils/validate';

const resolveImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.referrerPolicy = 'no-referrer';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('图片加载失败'));
    image.src = url;
  });
};

export const isContainNode = (nodes: NodeList, target: HTMLElement) =>
  nodes.length && Array.from(nodes).some((node) => node.contains(target));

export const compareUUID = (left: Node, right: Node) =>
  (left as HTMLElement)?.dataset?.watermark === (right as HTMLElement)?.dataset?.watermark;

let id = 0;
export const getUUID = () => {
  id += 1;
  return id;
};

export const plainStyle = (style: React.CSSProperties) => {
  return Object.entries(style).reduce((acc, [name, value]) => {
    if (value === undefined || value === null) return acc;
    const key = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${acc}${key}:${value};`;
  }, '');
};

export const draw = async ({
  text,
  image,
  textStyle,
  imageStyle,
  markStyle,
}: BaseWaterMarkProps): Promise<WaterMarkDrawResult> => {
  const { gapX, gapY, offsetLeft, offsetTop, width, height, opacity, rotate } = markStyle!;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return Promise.reject(new Error('当前环境不支持 Canvas'));

  const ratio = 3;
  const canvasWidth = (gapX! + width!) * ratio;
  const canvasHeight = (gapY! + height!) * ratio;

  const canvasOffsetLeft = offsetLeft || gapX! / 2;
  const canvasOffsetTop = offsetTop || gapY! / 2;

  canvas.setAttribute('width', `${canvasWidth}px`);
  canvas.setAttribute('height', `${canvasHeight}px`);
  // 设置透明度
  context.globalAlpha = opacity!;
  // 旋转画布
  context.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
  context.rotate((Math.PI / 180) * Number(rotate));

  if (image) {
    const { width: imageWidth, height: imageHeight } = imageStyle!;
    const img = await resolveImage(image);
    context.drawImage(img, 0, 0, imageWidth! * ratio, imageHeight! * ratio);

    return { url: canvas.toDataURL(), width: canvasWidth, height: canvasHeight, ratio };
  }

  if (isString(text) || (Array.isArray(text) && text.length)) {
    const {
      color,
      fontSize,
      fontWeight,
      fontFamily,
      fontStyle,
      fontVariant,
      textAlign,
      textBaseline,
    } = textStyle!;
    const markWidth = width! * ratio;
    const markHeight = height! * ratio;
    // 获取文本的最大宽度
    const texts = Array.isArray(text) ? text : [text!];
    const widths = texts.map((item) => context.measureText(item).width);
    const maxWidth = Math.max.apply(null, widths);
    const markSize = Number(fontSize) * ratio;

    // 获取行高
    const lineHeight = markSize + 5;
    // 设置文本对齐方式
    context.textAlign = textAlign!;
    // 设置文本基线
    context.textBaseline = textBaseline!;
    // 设置字体颜色
    context.fillStyle = color!;
    // 设置字体
    context.font = `${fontStyle} ${fontVariant} ${fontWeight} ${
      maxWidth > width! ? markSize / 2 : markSize
    }px/${lineHeight}px ${fontFamily}`;

    // 计算水印在y轴上的初始位置
    let initY = (markHeight - (fontSize! * texts.length + (texts.length - 1) * 5)) / 2;
    initY = initY < 0 ? 0 : initY;

    let initX = markWidth / 2;

    switch (textAlign) {
      case 'left':
      case 'start':
        initX = 0;
        break;
      case 'right':
      case 'end':
        initX = width! * ratio;
        break;
    }

    // 处理多行文本
    for (let i = 0; i < texts.length; i++) {
      context.fillText(texts[i], initX, initY + lineHeight * i, canvasWidth);
    }

    return { url: canvas.toDataURL(), width: canvasWidth, height: canvasHeight, ratio };
  }

  return Promise.reject(new Error('图片或文字选项缺失'));
};
