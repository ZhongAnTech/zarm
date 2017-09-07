import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Icon } from '../../components';
import '../styles/pages/IconPage';

const ICONS = [
  'right', 'right-round', 'right-round-fill',
  'wrong', 'wrong-round', 'wrong-round-fill',
  'info-round', 'info-round-fill',
  'question-round', 'question-round-fill',
  'warning-round', 'warning-round-fill',
  'arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom',
  'add', 'add-round', 'add-round-fill',
  'minus', 'minus-round', 'minus-round-fill',
  'broadcast',
];

class Page extends Component {

  render() {
    return (
      <Container className="icon-page">
        <Header title="图标 Icon" />
        <main>
          <Panel>
            <Panel.Header title="基本" />
            <Panel.Body>
              <div className="grid">
                {
                  ICONS.sort().map((icon, i) => {
                    return (
                      <div className="grid-column" key={+i}>
                        <Icon className="icon" theme="primary" type={icon} />
                        <span className="icon-name">{icon}</span>
                      </div>
                    );
                  })
                }
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
