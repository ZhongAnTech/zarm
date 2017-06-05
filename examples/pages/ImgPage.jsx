import React, { Component } from 'react';
import { Img, Lazy } from '../../components';

import '../styles/pages/ImgPage';

const src = "http://oi9dcgq2m.bkt.clouddn.com/img/bg.jpg";

class ValidFormPage extends Component {

  render() {
    const res = [];
    const { length } = src;

    for (let v = 0; v < length; v++) {
      let ele;

      if (v < length / 3) {
        ele = (<Img className="img" key={v} src={`${src}?index=${v}`} />);
      } else if (v < length / 1.5) {
        ele = (<Img.Lazy className="img" src={`${src}?index=${v}`} />);
      } else {
        ele = (
          <Lazy key={v}>
            <Img className="img" src={`${src}?index=${v}`} />
          </Lazy>
        );
      }

      res.push(ele);
    }

    return (
      <div>
        {res}
      </div>
    );
  }
}

export default ValidFormPage;
