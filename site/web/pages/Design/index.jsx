import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Icon, BackToTop } from 'zarm';
import { design } from '@site/site.config';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
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
                  <Route key={+i} path={`/design/${doc.key}`} component={LoadableComponent(doc)} />
                ))
              }
              <Redirect to="/" />
            </Switch>
          </div>
          <BackToTop className="scroll-to-top">
            <Icon type="arrow-top" size="sm" />
          </BackToTop>
        </main>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default withRouter(Page);
