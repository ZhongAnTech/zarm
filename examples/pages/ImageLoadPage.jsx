import React, { Component } from 'react';
import { ImageLoad } from '../../components';

import '../styles/pages/ImageLoadPage';

const src = "http://oi9dcgq2m.bkt.clouddn.com/img/bg.jpg";

class ValidFormPage extends Component {

  render() {
    const res = [];

    for(let v = 0; v < src.length; v++) {
      res.push(
        <ImageLoad className="img" key={v} src={`${src}?index=${v}`}/>
      );
    }

    return (
      <div>
        {res}
      </div>
    );
  }
}

export default ValidFormPage;
