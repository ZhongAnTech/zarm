import React, { PureComponent } from 'react';
import Container from '@examples/components/Container';
import Footer from '@examples/components/Footer';

class Page extends PureComponent {
  render() {
    return (
      <Container>
        <main>Not Found Page</main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
