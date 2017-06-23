import React, { Component } from 'react';
import Header from '../components/Header';
import { Swipe } from '../../components';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [
          {
            title: '百度',
            url: '#',
            img: 'http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png',
          },
          {
            title: '淘宝',
            url: '#',
            img: 'http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png',
          },
          {
            title: '腾讯',
            url: '#',
            img: 'http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png',
          },
        ],
      });
    }, 0);
  }

  renderSwipe() {
    return (
      <Swipe
        direction="left"
        // autoPlay={false}
        // isLoop={false}
        // height={617}
        onChangeEnd={(index) => {
          console.log(index);
        }}>
        {
          (this.state.items || []).map((item, i) => {
            return (
              <div className="ui-swipe-item" key={i}>
                <div className="ui-swipe-pic">
                  <a href={item.url}>
                    <img src={item.img} alt={item.title} />
                  </a>
                </div>
                <div className="ui-swipe-info">
                  <div className="ui-swipe-title">{item.title}</div>
                </div>
              </div>
            );
          })
        }
      </Swipe>
    );
  }

  render() {
    return (
      <div className="swipe-page">
        <Header title="图片轮播 Swipe" />
        <main>
          {this.renderSwipe()}
        </main>
      </div>
    );
  }
}

export default Page;
