import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMutationObserverRef } from '../utils/hooks';
import { ConfigContext } from '../n-config-provider';
import type { BaseWaterMarkProps } from './interface';
import {
  WATERMARK_DEFAULT_STYLES,
  TEXT_STYLE_DEFAULT,
  IMAGE_STYLE_DEFAULT,
  MARK_STYLE_DEFAULT,
} from './defaults';
import { draw, isContainNode, getUUID, compareUUID, plainStyle } from './utils';
import { noop } from '../utils';

export interface WaterMarkProps extends BaseWaterMarkProps {
  style?: React.CSSProperties;
}

const MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  attributeFilter: ['class', 'style', 'data-watermark'],
  attributeOldValue: true,
};

const WaterMark: React.FC<WaterMarkProps> = (props) => {
  const uuid = React.useRef(getUUID());
  const { text, image, mode, monitor, children } = props;
  const watermark = React.useRef<HTMLDivElement>(null);
  const [styles, setStyels] = React.useState<React.CSSProperties>(WATERMARK_DEFAULT_STYLES);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-water-mark`;

  const textStyle = { ...TEXT_STYLE_DEFAULT!, ...props.textStyle };
  const imageStyle = { ...IMAGE_STYLE_DEFAULT!, ...props.imageStyle };
  const markStyle = { ...MARK_STYLE_DEFAULT!, ...props.markStyle };

  let rerender = noop;

  const [, setNode] = useMutationObserverRef((records, observer) => {
    // 重置监听状态
    const reset = (target?: HTMLElement | Node | null, cb?: () => void) => {
      if (!target) return;
      observer.disconnect();
      cb?.();
      observer.observe(target, MUTATION_OBSERVER_CONFIG);
    };

    records.forEach((record) => {
      const { type, target, attributeName, addedNodes, removedNodes } = record;
      const source = watermark.current;
      if (!source) return;

      // style 发生变化
      if (type === 'attributes' && target.contains(source)) {
        attributeName === 'class' && source?.removeAttribute('class');
        attributeName === 'style' && rerender();
        attributeName === 'data-watermark' &&
          reset(watermark.current?.parentNode, () =>
            source?.setAttribute('data-watermark', String(uuid.current)),
          );
      }

      // 篡改节点标签名
      if (type === 'childList' && addedNodes.length) {
        const element = Array.from(addedNodes).find((node) => compareUUID(node, source));
        element && target.removeChild(element);
      }

      // 移除节点
      if (type === 'childList' && isContainNode(removedNodes, source)) {
        reset(target, () => {
          ReactDOM.unmountComponentAtNode(source);
          target.appendChild(source);
        });
      }
    });
  }, MUTATION_OBSERVER_CONFIG);

  // 渲染水印
  rerender = async () => {
    const style: React.CSSProperties = { ...WATERMARK_DEFAULT_STYLES };
    try {
      const rest = { text, image, textStyle, imageStyle, markStyle };
      const { url, ratio, width, height } = await draw(rest);
      if (!url) return;
      if (mode === 'repeat') {
        style.backgroundImage = `url(${url})`;
      } else {
        style.backgroundImage = `url(${url}), url(${url})`;
        style.backgroundRepeat = 'repeat, repeat';
        style.backgroundPosition = `${width / 2}px ${height / 2}px, 0 0`;
      }
      style.backgroundSize = `${width / ratio}px`;
      setStyels(style);
      setNode(monitor ? watermark.current?.parentElement! : null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const isContains = React.isValidElement(children);

  React.useEffect(() => {
    rerender();
  }, [
    textStyle.color,
    textStyle.fontStyle,
    textStyle.fontWeight,
    textStyle.fontSize,
    textStyle.fontFamily,
    textStyle.fontVariant,
    textStyle.textAlign,
    textStyle.textBaseline,
    imageStyle.width,
    imageStyle.height,
    markStyle.width,
    markStyle.height,
    markStyle.rotate,
    markStyle.opacity,
    markStyle.gapX,
    markStyle.gapY,
    markStyle.offsetLeft,
    markStyle.offsetTop,
    text,
    image,
    mode,
    monitor,
    isContains,
  ]);

  const style = React.useMemo(() => {
    const properties = {
      zIndex: markStyle.zIndex,
      ...styles,
      ...props.style,
    };

    if (isContains) {
      properties.position = 'absolute';
    }

    // 监视模式写入样式到节点
    if (monitor && watermark.current) {
      watermark.current?.setAttribute('style', plainStyle(properties));
    }
    return properties;
  }, [markStyle.zIndex, monitor, styles, props.style, isContains]);

  const element = <div ref={watermark} data-watermark={uuid.current} style={style} />;

  if (isContains)
    return (
      <div className={`${prefixCls}-wrapper`}>
        {children}
        {element}
      </div>
    );

  return element;
};

WaterMark.displayName = 'WaterMark';

WaterMark.defaultProps = {
  textStyle: TEXT_STYLE_DEFAULT,
  imageStyle: IMAGE_STYLE_DEFAULT,
  markStyle: MARK_STYLE_DEFAULT,
  mode: 'interval',
  monitor: true,
};

export default WaterMark;
