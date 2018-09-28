import React, { PureComponent } from 'react';
import { Cell } from 'zarm';
import Container from '@site/components/Container';
import Footer from '@site/components/Footer';
import '../styles/pages/IndexPage.scss';

class Page extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <main>
          <Cell hasArrow title="docs" onClick={() => history.push('/docs/input')} />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
