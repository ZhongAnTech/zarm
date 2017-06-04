import React, { Component } from 'react';
import { Img } from '../../components';

import '../styles/pages/ImgPage';

const src = "http://oi9dcgq2m.bkt.clouddn.com/img/bg.jpg";

class ValidFormPage extends Component {

  render() {
    const res = [];

    for(let v = 0; v < src.length; v++) {
      res.push(
        <Img className="img" key={v} src={`${src}?index=${v}`}/>
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
