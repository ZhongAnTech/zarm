
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import '../styles/components/Document.scss';

class Document extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowCode : false,
    };
  }

  toggleCode() {
    this.setState({
      isShowCode : !this.state.isShowCode,
    })
  }

  render () {
    const { title, demo, code, ...others } = this.props;
    const style = {
      code: {},
      pre: {},
    }

    style.code = {
      paddingBottom : (this.state.isShowCode) ? 5 : 0,
    };
    style.pre = {
      display       : (this.state.isShowCode) ? 'block' : 'none',
    };

    return (
      <div className="ui-doc" {...others}>
        <div className="doc-title">{title}</div>
        <div className="doc-body">
          <div className="doc-demo">{demo}</div>
          {
          <div className="doc-code" style={style.code}>
            <div className="code-bar" onClick={() => this.toggleCode()}>Code</div>
            <pre style={style.pre}>
              <code className="javascript">{code}</code>
            </pre>
          </div>
          }
        </div>
      </div>
    );
  }

}

Document.propTypes = {
  title : PropTypes.string,
};

Document.defaultProps = {

};

export default Document;