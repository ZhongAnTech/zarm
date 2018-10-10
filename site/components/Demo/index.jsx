import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import '../../../components/style/entry';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
    this.title = String(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  componentWillUnmount() {
    if (this.containerElem) {
      ReactDOM.unmountComponentAtNode(this.containerElem);
    }
  }

  toggleShowCode = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderSource(value) {
    import('../../../components').then((Element) => {
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
      // new Function(...args)(...argv);

      this.source[2] = value;
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }

  render() {
    return (
      <div>
        <h3>{this.title}</h3>
        <div className="demo">
          {/* {
            this.props.location.pathname === '/panel'
              ? <div className="demo-simulator" id={this.containerId} ref={(elem) => { this.containerElem = elem; }} />
              : (
                <div className="demo-simulator">
                  <Panel titleRender={<span>{this.title}</span>}>
                    <div id={this.containerId} ref={(elem) => { this.containerElem = elem; }} />
                  </Panel>
                </div>
              )
          } */}
          <div className="demo-code">
            {/* <div className="source" id={this.containerId} ref={(elem) => { this.containerElem = elem; }} /> */}
            {/* <div className="demo-code-editor" ref={(ele) => { this.code = ele; }} dangerouslySetInnerHTML={{ __html: this.description }} /> */}
            {this.source[2]}
          </div>
          {/* <div className="demo-control" onClick={this.toggleShowCode}>
            <span>{this.state.isOpen ? '隐藏' : '展开'}</span>
          </div> */}
        </div>
      </div>
    );
  }
}
