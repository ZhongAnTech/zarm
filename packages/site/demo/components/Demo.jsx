import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Panel } from 'zarm';
import * as ZarmDesignIcons from '@zarm-design/icons';
import enUS from 'zarm/config-provider/locale/en_US';
import zhCN from 'zarm/config-provider/locale/zh_CN';
import 'zarm/style/entry';

export default ({ location, globalContext, children }) => {
  const containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  const document = children.match(/([^]*)\n?(```[^]+```)/);
  const title = String(document[1]);
  const containerRef = useRef();

  const renderSource = useCallback(() => {
    const source = document[2].match(/```(.*)\n?([^]+)```/);

    import('zarm')
      .then((Element) => {
        const locale = {
          en_US: enUS,
          zh_CN: zhCN,
        };
        const args = ['context', 'React', 'ReactDOM', 'Zarm', 'GlobalContext', 'Locale', 'ZarmDesignIcons'];
        const argv = [this, React, ReactDOM, Element, globalContext, locale, ZarmDesignIcons];

        return {
          args,
          argv,
        };
      })
      .then(({ args, argv }) => {
        const value = source[2]
          .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'react';/, 'const { $1 } = React;')
          .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm';/, 'const { $1 } = Zarm;')
          .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'@zarm-design\/icons';/, 'const { $1 } = ZarmDesignIcons;')
          .replace(
            /import\s+(.*)\s+from\s+'zarm\/lib\/config-provider\/locale\/(.*)';/g,
            "const $1 = Locale['$2'];",
          )
          // 替换格式
          // ReactDOM.render(<Demo />, mountNode);
          .replace(
            /ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g,
            `ReactDOM.render($1, document.getElementById('${containerId}'))`,
          )
          // 替换格式
          // ReactDOM.render(
          //   <>
          //     <Button>default</Button>
          //     <Button theme="primary">primary</Button>
          //   </>,
          //   mountNode,
          // );
          .replace(
            /ReactDOM.render\(\s?([^]+?)(,([\r\n])(\s)*mountNode,(\s)*\))/g,
            `ReactDOM.render($1, document.getElementById('${containerId}'))`,
          );

        const { code } = transform(value, {
          presets: ['es2015', 'react'],
          plugins: ['proposal-class-properties'],
        });

        args.push(code);
        // eslint-disable-next-line
        new Function(...args)(...argv);
        // source[2] = value;
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
  }, [containerId, document, globalContext]);

  useEffect(() => {
    const container = containerRef.current;
    renderSource();

    return function cleanup() {
      container && ReactDOM.unmountComponentAtNode(container);
    };
  }, [renderSource]);

  // Panel的例子特殊处理
  return location.pathname === '/panel' ? (
    <div id={containerId} ref={containerRef} />
  ) : (
    <Panel title={title}>
      <div id={containerId} ref={containerRef} />
    </Panel>
  );
};
