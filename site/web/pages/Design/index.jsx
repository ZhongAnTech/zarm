import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Icon } from 'dragon-ui';
import { design } from '@site/site.config';
import Format from '@site/utils/format';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import Footer from '@site/web/components/Footer';
import ScrollToTop from '@site/web/components/ScrollToTop';
import './style.scss';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    loading: () => null,
  });
};

class Page extends PureComponent {
  render() {
    return (
      <Container className="design-page">
        <Header />
        <main>
          <div className="main-container">
            <Switch>
              {
                design.map((doc, i) => (
                  <Route key={+i} path={`/design/${Format.camel2Dash(doc.name)}`} component={LoadableComponent(doc)} />
                ))
              }
              <Redirect to="/" />
            </Switch>
          </div>
          <ScrollToTop>
            <div className="scroll-to-top">
              <Icon type="arrow-top" />
            </div>
          </ScrollToTop>
        </main>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default withRouter(Page);
