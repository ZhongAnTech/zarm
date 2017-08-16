import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Swipe, Button } from '../../components';
import '../styles/pages/SwipePage';

const ITEMS = [
  {
    url: '#',
    img: require('../images/banners/1.png'),
  },
  {
    url: '#',
    img: require('../images/banners/2.png'),
  },
  {
    url: '#',
    img: require('../images/banners/3.png'),
  },
];

function contentRender() {
  return ITEMS.map((item, i) => {
    return (
      <div className="za-swipe-item" key={+i}>
        <div className="swipe-item-pic">
          <a href={item.url}>
            <img src={item.img} alt={item.title} />
          </a>
        </div>
      </div>
    );
  });
}

class Page extends Component {

  render() {
    return (
      <Container className="swipe-page">
        <Header title="图片轮播 Swipe" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Swipe
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
                height={180}>
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
                loop
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
                loop
                direction="left"
                onChangeEnd={(index) => {
                  console.log(index);
                }}>
                {contentRender()}
              </Swipe>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
