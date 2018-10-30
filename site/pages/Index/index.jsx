import React, { PureComponent } from 'react';
import { Button } from 'dragon-ui';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import './style.scss';

class Page extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <Header />
        <main>
          <div className="introduce">
            <div className="title"><span>ZARM</span> DESIGN</div>
            <div className="description">一套为开发者、设计师和产品经理准备的组件库帮助你的网站快速成形</div>
            <Button onClick={() => history.push('/documents/quick-start')}>开始使用</Button>
          </div>
          <div className="banner" />
        </main>
      </Container>
    );
  }
}

export default Page;
