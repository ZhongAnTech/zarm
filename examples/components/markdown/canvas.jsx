import React from 'react';
import ReactDOM from 'react-dom';
import zarm from 'zarm';
import marked from 'marked';
import { transform } from 'babel-standalone';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
    this.description = marked(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);

    this.state = {
      showBlock: false,
    };
    this.blockControl = this.blockControl.bind(this);
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock,
    });
  }

  renderSource(value) {
    // console.log(zarm.Button);
    import('../../../components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'Button'];
      const argv = [this, React, ReactDOM, zarm.Button];

      // Object.keys(Element).forEach((key) => {
      //   args.push(key);
      //   argv.push(Element[key]);
      // });

      return {
        args,
        argv,
      };
    }).then(({ args, argv }) => {
      // eslint-disable-next-line
      const code = transform(`
        class Demo extends React.Component {
          ${value}
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react'],
      }).code;

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
    console.log(this.props)
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        {
          this.state.showBlock && (
            <div className="meta">
              {
                this.description && (
                  <div
                    className="description"
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
            </div>
          )
        }
        <div className="demo-block-control" onClick={this.blockControl}>
          {
            this.state.showBlock ? (
              <span>
                <i className="el-icon-caret-top" />隐藏
              </span>
            ) : (
              <span>
                <i className="el-icon-caret-bottom" />展开
              </span>
              )
          }
        </div>
      </div>
    );
  }
}
