import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Panel } from 'zarm';
import locale from 'zarm/components/locale-provider/locale/zh_CN';
import '@/components/style/entry';

function attachTouchEvent() {
  let startPoint = null;

  function getBodyScrollTop() {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollTop;
  }

  function touchstart(e) {
    startPoint = e.touches ? e.touches[0].pageY : e.pageY;
  }

  function touchend() {
    startPoint = null;
  }

  function touchmove(e) {
    const endPoint = e.touches ? e.touches[0].pageY : e.pageY;
    const scrollTop = getBodyScrollTop();
    if (endPoint - startPoint > 0 && scrollTop <= 0) {
      e.preventDefault();
    }
  }

  document.body.addEventListener('touchstart', touchstart);
  document.body.addEventListener('touchend', touchend);
  document.body.addEventListener('touchmove', touchmove, { passive: false });

  return () => {
    document.body.removeEventListener('touchmove', touchmove);
    document.body.removeEventListener('touchstart', touchstart);
    document.body.removeEventListener('touchend', touchend);
  };
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
    this.title = String(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
    this.romoveTouchEvent = null;
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
    const { location } = this.props;
    if (location.pathname === '/pull') {
      this.romoveTouchEvent = attachTouchEvent();
    } else {
      this.romoveTouchEvent && this.romoveTouchEvent();
    }
  }

  componentWillUnmount() {
    if (this.containerElem) {
      ReactDOM.unmountComponentAtNode(this.containerElem);
    }
    this.romoveTouchEvent && this.romoveTouchEvent();
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
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm';/, 'const { $1 } = zarm;')
        .replace('mountNode', `document.getElementById('${this.containerId}')`)
        .replace('<Demo />', `<zarm.LocaleProvider locale={${JSON.stringify(locale)}}><Demo /></zarm.LocaleProvider>`);

      const { code } = transform(value, {
        presets: ['es2015', 'react'],
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
        <Panel title={<span>{this.title}</span>}>
          <div id={this.containerId} ref={(elem) => { this.containerElem = elem; }} />
        </Panel>
      );
  }
}
