import React, { Component } from 'react';
import classnames from 'classnames';
import { Icon } from 'zarm';
import './style.scss';

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

class Container extends Component {
  // state = {
  //   language: window.localStorage.language || 'zh_CN',
  // };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { className, children } = this.props;
    const cls = classnames('app-container', className);
    // const { language } = this.state;

    return (
      <div className={cls}>
        <a className="github" href="https://github.com/ZhongAnTech/zarm">
          <Icons type="github" size="lg" />
        </a>
        {/* <div className="lang">
          <Radio.Group
            type="button"
            value={language}
            onChange={(value) => {
              this.setState({
                language: value,
              });
              window.localStorage.language = value;
              window.location.reload();
            }}
          >
            <Radio value="zh_CN">中文</Radio>
            <Radio value="en_US">EN</Radio>
          </Radio.Group>
        </div> */}
        {children}
      </div>
    );
  }
}

export default Container;
