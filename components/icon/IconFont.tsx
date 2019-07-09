import React, { ReactNode } from 'react';
import Icon from './index';
import IconProps, { CustomIconOptions } from './PropsType';

const customCache = new Set<string>();

export default function create(options: CustomIconOptions): React.FunctionComponent<IconProps> {
  const { scriptUrl } = options;

  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    typeof document !== 'undefined'
    && typeof window !== 'undefined'
    && typeof document.createElement === 'function'
    && typeof scriptUrl === 'string'
    && scriptUrl.length
    && !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }

  const Iconfont: React.FunctionComponent<IconProps> = (props) => {
    const { type, children, ...restProps } = props;

    let content: ReactNode;
    if (type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    return (
      <Icon {...restProps}>
        {content}
      </Icon>
    );
  };

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
