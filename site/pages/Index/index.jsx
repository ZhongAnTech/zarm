import React, { PureComponent } from 'react';
import Container from '@site/components/Container';
import Footer from '@site/components/Footer';

class Page extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <main
          style={{
            margin: '0 auto',
            width: 1500,
            height: 1000,
            background: `url(${require('./images/index.jpg')}) no-repeat top center`,
            backgroundSize: 'contain',
          }}
          onClick={() => history.push('/docs/input')}
        />
        <Footer />
      </Container>
    );
  }
}

export default Page;
