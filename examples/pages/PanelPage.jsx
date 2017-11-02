import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel } from '../../components';
import '../styles/pages/PanelPage';

class Page extends Component {

  render() {
    return (
      <Container className="panel-page">
        <Header title="面板 Panel" />
        <main>
          <Panel>
            <Panel.Header title="标题" more={<a onClick={() => alert('click more')}>更多</a>} />
            <Panel.Body>
              <div className="box">内容</div>
            </Panel.Body>
            <Panel.Footer title="底部左侧" more="底部右侧" />
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
