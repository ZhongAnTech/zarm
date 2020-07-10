import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Panel } from 'zarm';
import '@/components/style/entry';

export default ({ location, lang, children }) => {
  const containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  const document = children.match(/([^]*)\n?(```[^]+```)/);
  const title = String(document[1]);
  const source = document[2].match(/```(.*)\n?([^]+)```/);
  const containerElem = useRef();

  const renderSource = (value) => {
    import('@/components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'zarm'];
      const argv = [this, React, ReactDOM, Element];

      return {
        args,
        argv,
      };
    }).then(({ args, argv }) => {
      const locale = lang === 'enUS'
        ? require('zarm/locale-provider/locale/en_US')
        : require('zarm/locale-provider/locale/zh_CN');
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'react';/, 'const { $1 } = React;')
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm';/, 'const { $1 } = zarm;')
        .replace(/ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g, `
          ReactDOM.render(
            <zarm.LocaleProvider locale={${JSON.stringify(locale.default)}}>
              $1
            </zarm.LocaleProvider>,
            document.getElementById('${containerId}'),
          )
        `);

      const { code } = transform(value, {
        presets: ['es2015', 'react'],
        plugins: ['proposal-class-properties'],
      });

      args.push(code);
      // eslint-disable-next-line
      new Function(...args)(...argv);
      source[2] = value;
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  };

  useEffect(() => {
    const container = containerElem.current;
    renderSource(source[2]);

    return function cleanup() {
      container && ReactDOM.unmountComponentAtNode(container);
    };
  });


  // Panel的例子特殊处理
  return (location.pathname === '/panel')
    ? <div id={containerId} ref={containerElem} />
    : (
      <Panel title={title}>
        <div id={containerId} ref={containerElem} />
      </Panel>
    );
};
