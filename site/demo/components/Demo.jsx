import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Panel } from 'zarm';
import '@/components/style/entry';


export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
    this.title = String(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
    this.containerElem = null;
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  componentWillUnmount() {
    if (this.containerElem) {
      ReactDOM.unmountComponentAtNode(this.containerElem);
    }
  }

  renderSource(value) {
    import('@/components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'zarm'];
      const argv = [this, React, ReactDOM, Element];

      return {
        args,
        argv,
      };
    }).then(({ args, argv }) => {
      const locale = window.localStorage.language === 'en_US'
        ? require('zarm/locale-provider/locale/en_US')
        : require('zarm/locale-provider/locale/zh_CN');
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm';/, 'const { $1 } = zarm;')
        .replace(/ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g, `
          ReactDOM.render(
            <zarm.LocaleProvider locale={${JSON.stringify(locale.default)}}>
              $1
            </zarm.LocaleProvider>,
            document.getElementById('${this.containerId}'),
          )
        `);

      const { code } = transform(value, {
        presets: ['es2015', 'react'],
        plugins: ['proposal-class-properties'],
      });

      args.push(code);
      // eslint-disable-next-line
      new Function(...args)(...argv);

      this.source[2] = value;
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }

  render() {
    const { location } = this.props;
    // Panel的例子特殊处理
    return (location.pathname === '/panel')
      ? <div id={this.containerId} ref={(elem) => { this.containerElem = elem; }} />
      : (
        <Panel title={this.title}>
          <div id={this.containerId} ref={(elem) => { this.containerElem = elem; }} />
        </Panel>
      );
  }
}
