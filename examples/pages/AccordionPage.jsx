import React, { Component } from 'react';
import { Accordion, Panel } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {

  state = {
    active: [1],
  };

  componentDidMount() {
    // 动态更新activeIndex
    setTimeout(() => {
      this.setState({
        active: [0],
      });
    }, 300);
  }

  render() {
    const { active } = this.state;

    return (
      <Container className="accordion-page">
        <Header title="手风琴 Accordion" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Accordion onChange={i => console.log(i)}>
                <Accordion.Item title="50元套餐" key={123}>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="100元套餐">
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="200元套餐">
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                </Accordion.Item>
              </Accordion>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="手风琴模式" />
            <Panel.Body>
              <Accordion accordion animated>
                <Accordion.Item title="50元套餐">
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="100元套餐">
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="200元套餐">
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                </Accordion.Item>
              </Accordion>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="默认展开项" />
            <Panel.Body>
              <Accordion animated defaultActiveIndex={[0, 1]}>
                <Accordion.Item title="50元套餐">
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="100元套餐">
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="200元套餐">
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                </Accordion.Item>
              </Accordion>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="动态更新展开项" />
            <Panel.Body>
              <Accordion animated defaultActiveIndex={[0, 1]} activeIndex={active}>
                <Accordion.Item title="50元套餐">
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                  <div>我是50元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="100元套餐">
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                  <div>我是100元套餐内容</div>
                </Accordion.Item>
                <Accordion.Item title="200元套餐">
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                  <div>我是200元套餐内容</div>
                </Accordion.Item>
              </Accordion>
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
