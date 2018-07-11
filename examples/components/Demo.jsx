import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from 'zarm';
import { transform } from 'babel-standalone';
import '../../components/style/entry';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
    this.title = String(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  renderSource(value) {
    import('../../components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'zarm'];
      const argv = [this, React, ReactDOM, Element];

      // Object.keys(Element).forEach((key) => {
      //   args.push(key);
      //   argv.push(Element[key]);
      // });

      return {
        args,
        argv,
      };
    }).then(({ args, argv }) => {
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm';/, 'const { $1 } = zarm;')
        .replace('mountNode', `document.getElementById('${this.containerId}')`);

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
    return (
      <Panel>
        <Panel.Header title={<span>{this.title}</span>} />
        <Panel.Body>
          <div id={this.containerId} />
        </Panel.Body>
      </Panel>
    );
  }
}
