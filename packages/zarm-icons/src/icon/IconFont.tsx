import React, { ReactNode, FunctionComponent } from 'react';
import Icon, { IconProps } from './index';

const customCache = new Set<string>();

export default function createFromIconfont(scriptUrl: string): FunctionComponent<IconProps> {
  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }

  const Iconfont = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
    const { type } = props;

    let content: ReactNode;
    if (type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    // fix https://github.com/ZhongAnTech/zarm/issues/835
    // @ts-ignore
    const I = Icon.default ? Icon.default : Icon;
    return (
      <I {...props} ref={ref}>
        {content}
      </I>
    );
  });

  return Iconfont;
}
