
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import { Icon, Cell } from '../../components';

import '../../styles/index.scss';

class Page2 extends Component {

  render() {
    return (
      <div>
        <Cell type="link" title="Cell" icon={<img src="https://weui.io/images/icon_nav_cell.png" />} onClick={() => browserHistory.push('/cell')} />
      </div>
    );
  }
}

export default Page2;