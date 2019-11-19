import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { design } from '@site/site.config';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import ScrollToTop from '@site/web/components/ScrollToTop';
import './style.scss';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    loading: () => null,
  });
};

const arrowTopSvg = (
  <i style={{ fontSize: '14px', color: 'var(--theme-danger)', width: '1em', height: '1em', lineHeight: '1em', display: 'inline-block' }}>
    <svg viewBox="0 0 32 18" width="1em" height="1em" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 17L16.161 2 31 17" stroke="currentColor" strokeWidth="2.6" fill="none" fillRule="evenodd" /></svg>
  </i>
);

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
          <ScrollToTop>
            <div className="scroll-to-top">
              {arrowTopSvg}
            </div>
          </ScrollToTop>
        </main>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default withRouter(Page);
