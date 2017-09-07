import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Badge } from '../../components';
import '../styles/pages/BadgePage';

class Page extends Component {

  render() {
    return (
      <Container className="badge-page">
        <Header title="徽标 Badge" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <Cell hasArrow title="点状" description={<Badge shape="dot" />} onClick={() => {}} />
              <Cell hasArrow title="直角" description={<Badge text="免费" />} onClick={() => {}} />
              <Cell hasArrow title="圆角" description={<Badge shape="radius" text="new" />} onClick={() => {}} />
              <Cell hasArrow title="椭圆形" description={<Badge shape="round" text="999+" />} onClick={() => {}} />
              <Cell hasArrow title="圆形" description={<Badge shape="circle" text={3} />} onClick={() => {}} />
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="上标位置" />
            <Panel.Body className="custom-panel">
              <div className="box">
                <Badge sup shape="dot"><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="radius" text="new"><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="round" text="999+"><div className="box-item" /></Badge>
              </div>
              <div className="box">
                <Badge sup shape="circle" text={3}><div className="box-item" /></Badge>
              </div>
            </Panel.Body>
          </Panel>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
