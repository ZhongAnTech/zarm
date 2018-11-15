import React, { PureComponent, HTMLAttributes } from 'react';
import { PropsType } from './PropsType';
import classnames from 'classnames';
import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } from './constants';
import { getKeyFrameModifier, animationModifier } from './modifiers';
export interface MarqueeProps extends HTMLAttributes<HTMLDivElement>, PropsType {}
export default class Marquee extends PureComponent<MarqueeProps, {}> {
  static defaultProps = {
    prefixCls: 'za-marquee',
    direction: 'left',
    scrollAmount: 6,
    loop: true,
    scrollDelay: 0,
  };
  private container;
  private scrollItem;
  private conatinerBoundingRect;
  private boundingRect;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.conatinerBoundingRect = this.container.getBoundingClientRect();
    this.boundingRect = this.scrollItem.getBoundingClientRect();
    this.setScrollItemPostion();
    this.animationLoop();
  }
  setScrollItemPostion() {
    const dir = this.props.direction.toLowerCase();
    const container = this.conatinerBoundingRect;
    const boundingRect = this.boundingRect;
    let modifier = '';
    switch (dir) {
      case DIRECTION_LEFT:
        modifier = `translate3d(${container.width}px, 0, 0)`;
        break;
      case DIRECTION_RIGHT:
        modifier = `translate3d(-${boundingRect.width}px, 0, 0)`;
        break;
      case DIRECTION_UP:
        modifier = `translate3d(0, ${this.props.height}px, 0)`;
        break;
      case DIRECTION_DOWN:
        modifier = `translate3d(0, -${boundingRect.height}px ,0)`;
        break;
      default:
        modifier = `translate3d(${boundingRect.width}px, 0, 0)`;
    }
    this.container.style.transform = modifier;
    this.container.style.WebkitTransform = modifier;
  }
  genKey() {
    const { prefixCls, direction } = this.props;
    const id = Date.now();
    return `${prefixCls}-${direction}-${id}`.toUpperCase();
  }
  getDistance() {
    const dir = this.props.direction.toLowerCase();
    switch (dir) {
      case DIRECTION_LEFT:
        return this.boundingRect.width;
      case DIRECTION_RIGHT:
        return this.conatinerBoundingRect.width;
      case DIRECTION_UP:
        return this.boundingRect.height;
      case DIRECTION_DOWN:
        return this.boundingRect.height;
      default:
        return this.boundingRect.width;
    }
  }
  animationLoop() {
    const key = this.genKey();
    const { scrollAmount, loop, scrollDelay } = this.props;
    const modifier = getKeyFrameModifier(this.props.direction);
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = modifier(this.getDistance(), key);
    document.getElementsByTagName('head')[0].appendChild(style);
    const animation = animationModifier(scrollAmount, loop, scrollDelay, key);
    this.container.style.animation = animation;
    this.container.style.WebkitAnimation = animation;
  }
  render() {
    let { prefixCls, className, style, height, width } = this.props;
    style = style || {};
    if (height) {
      style.height = `${height}px`;
    }
    if (width) {
      style.width = `${width}px`;
    }
    const cls = classnames(prefixCls, className);
    return (<div className={cls} style={style}>
        <div className={prefixCls + '-body'} ref={(el) => { this.container = el; }}>
          <div className={prefixCls + '-content'} ref={(el) => { this.scrollItem = el; }}>
            {this.props.children}
          </div>
        </div>
    </div>);
  }
}
