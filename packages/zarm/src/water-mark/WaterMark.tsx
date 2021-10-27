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
import { draw, plainStyle } from './utils';

export interface WaterMarkProps extends BaseWaterMarkProps {
  style?: React.CSSProperties;
}

const MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  attributeFilter: ['class', 'style'],
  attributeOldValue: true,
};

const WaterMark: React.FC<WaterMarkProps> = (props) => {
  const { text, image, mode, monitor, children } = props;
  const watermark = React.useRef<HTMLDivElement>(null);
  const [styles, setStyels] = React.useState<React.CSSProperties>(WATERMARK_DEFAULT_STYLES);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-water-mark`;

  const textStyle = Object.assign(TEXT_STYLE_DEFAULT!, props.textStyle);
  const imageStyle = Object.assign(IMAGE_STYLE_DEFAULT!, props.imageStyle);
  const markStyle = Object.assign(MARK_STYLE_DEFAULT!, props.markStyle);

  let render = () => {};
  let handleMonitor = () => {};

  const [setNode] = useMutationObserverRef((records, observer) => {
    records.forEach((record) => {
      const { type, target, attributeName, removedNodes } = record;
      // style 发生变化
      if (type === 'attributes' && target.contains(watermark.current)) {
        attributeName === 'class' && watermark.current?.removeAttribute('class');
        attributeName === 'style' && render();
      }

      // 移除节点
      if (
        type === 'childList' &&
        removedNodes.length &&
        watermark.current &&
        Array.from(removedNodes).some((node) => node.contains(watermark.current))
      ) {
        observer.disconnect();
        ReactDOM.unmountComponentAtNode(watermark.current);
        target.appendChild(watermark.current);
        observer.observe(target, MUTATION_OBSERVER_CONFIG);
      }
    });
  }, MUTATION_OBSERVER_CONFIG);

  handleMonitor = () => {
    if (!monitor) return setNode(null);
    const parentElement = watermark.current?.parentElement;
    parentElement && setNode(parentElement);
  };

  render = async () => {
    const rest: React.CSSProperties = { ...WATERMARK_DEFAULT_STYLES };
    draw({ text, image, textStyle, imageStyle, markStyle })
      .then((config) => {
        if (config.url) {
          const { url, ratio } = config;
          if (mode === 'repeat') {
            rest.backgroundImage = `url(${url})`;
          } else {
            rest.backgroundImage = `url(${url}), url(${url})`;
            rest.backgroundRepeat = 'repeat, repeat';
            rest.backgroundPosition = `${config.width / 2}px ${config.height / 2}px, 0 0`;
          }
          rest.backgroundSize = `${config.width / ratio}px`;
        }
        setStyels(rest);
        handleMonitor();
      })
      .catch((error) => console.error(error.message));
  };

  const isContains = React.isValidElement(children);

  React.useEffect(() => {
    render();
  }, [
    text,
    image,
    mode,
    monitor,
    isContains,
    ...Object.values({ ...textStyle, ...imageStyle, ...markStyle }),
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

  const element = <div ref={watermark} style={style} />;

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
