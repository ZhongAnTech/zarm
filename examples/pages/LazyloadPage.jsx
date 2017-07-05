import React, { Component } from 'react';
import Header from '../components/Header';
import { Img, Icon } from '../../components';
import '../styles/pages/LazyloadPage';

const img = 'http://oi9dcgq2m.bkt.clouddn.com/img/bg.jpg';
// const img = require('../images/icons/state.png');

class Page extends Component {

  render() {
    const images = [];

    for (let i = 0; i < 1000; i += 1) {
      images.push(
        <Img
          lazyload
          key={i}
          src={`${img}?t=${i}`}
          alt=""
          placeholder={
            <div className="img-placeholder">
              <Icon type="loading" className="rotate360" />
            </div>
          }
          />
      );
    }

    return (
      <div className="lazyload-page">
        <Header title="懒加载 Lazyload" />
        <main>
          {images}
        </main>
      </div>
    );
  }
}

export default Page;
