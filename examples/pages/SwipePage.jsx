import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Swipe, Button } from '../../components';
import '../styles/pages/SwipePage';

const ITEMS = [
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
];

function contentRender() {
  return ITEMS.map((item, i) => {
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
  });
}

class Page extends Component {

  render() {
    return (
      <div className="swipe-page">
        <Header title="图片轮播 Swipe" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Swipe
                direction="left"
                // autoPlay={false}
                // isLoop={false}
                // height={617}
                onChangeEnd={(index) => {
                  console.log(index);
                }}>
                {contentRender()}
              </Swipe>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>纵向</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Swipe
                direction="top"
                height={187}>
                {contentRender()}
              </Swipe>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>循环轮播</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Swipe
                ref={(ele) => { this.swipe = ele; }}
                isLoop
                direction="left"
                onChangeEnd={(index) => {
                  console.log(index);
                }}>
                {contentRender()}
              </Swipe>
              <div className="controls">
                <Button
                  block
                  size="sm"
                  onClick={() => {
                    this.swipe.onJumpTo(0);
                  }}>无动画切换指定页</Button>

                <Button
                  block
                  size="sm"
                  onClick={() => {
                    this.swipe.onSlideTo(2);
                  }}>滑动到指定页</Button>
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>自动循环轮播</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Swipe
                autoPlay
                isLoop
                direction="left"
                onChangeEnd={(index) => {
                  console.log(index);
                }}>
                {contentRender()}
              </Swipe>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
