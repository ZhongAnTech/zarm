import React, { PureComponent } from 'react';
import Container from '@/web/components/Container';
import "./index.scss";
import { FormattedMessage } from 'react-intl';

class Page extends PureComponent {
  

  render() {
    const { history } = this.props;

    return (
      <Container>
        <div className='notFound'>
        <img  src={require('./images/404.png')} alt="" />
        <div className='false'>404</div>
        <div className='tipsFont'>
            <FormattedMessage id="app.404.tips" />
        </div>
           <button type="button" onClick={() => history.push('/')}>
              <FormattedMessage id="app.404.backhome" />
            </button>
        </div>
      </Container>
    );
  }
}

export default Page;
