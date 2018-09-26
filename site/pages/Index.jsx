import React, { PureComponent } from 'react';
import { Cell } from 'zarm';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/components/Header.scss';
import '../styles/pages/IndexPage.scss';

class Page extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm UI</div>
            <div className="brand-description">众安科技移动端组件库</div>
          </section>
        </header>
        <main>
          <Cell hasArrow title="docs" onClick={() => history.push('/docs')} />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
