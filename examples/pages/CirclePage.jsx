import React, { Component } from 'react';
import { Circle } from '../../components';

import '../styles/pages/CirclePage';

const list = ['quarter', 'loop', 'rainbow', 'process'];
const loadList = [25, 50, 75, 100];

class CirclePage extends Component {

  render() {
    const items = list.map(
      (item, i) => (<div className="circle-item" data-before={`type: ${item}`}><Circle type={item} key={i} /></div>)
    );

    const loadItems = loadList.map(
      (item, i) => (<div className="circle-item" data-before={`type: process, percent: ${item}`}><Circle percent={item} type="process" key={i} /></div>)
    );

    return (
      <div className="pages-circle-render">
        {items}
        {loadItems}
      </div>
    );
  }
}

export default CirclePage;
