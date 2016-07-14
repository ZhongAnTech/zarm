
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { Icon, Cell } from '../../components';
import '../../styles/index.scss';

class Page2 extends Component {

  render() {
    return (
      <div>
        <Cell title="标题文字" />
        <Cell title="标题文字" description="描述文字" />
        <Cell title="标题文字" description={<Icon type="check" />}></Cell>
        <Cell type="link" title="标题文字" />
        <Cell type="link" title="标题文字" description="描述文字" />
        <Cell type="link" title="标题文字" icon={<Icon type="check" />}></Cell>
        <Cell type="link" title="标题文字" icon={<img src="https://weui.io/images/icon_nav_toast.png" />}></Cell>
      </div>
    );
  }
}

export default Page2;