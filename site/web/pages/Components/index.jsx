import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { documents, components } from '@site/site.config';
import Format from '@site/utils/format';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import SideBar from '@site/web/components/SideBar';
import ScrollToTop from '@site/web/components/ScrollToTop';
import Markdown from '@site/web/components/Markdown';
import './style.scss';

const isComponentPage = page => ['quick-start', 'change-log'].indexOf(page) === -1;

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      const C = loaded.default;
      return <Markdown document={C} className={`${Format.camel2Dash(component.name)}-page`} {...props} />;
    },
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
    const { match } = this.props;
    const { form, feedback, view, navigation, other } = components;

    const containerCls = classnames('main-container', {
      'no-simulator': !isComponentPage(match.params.component),
    });

    return (
      <Container className="components-page">
        <Header />
        <main>
          <SideBar />
          {
            isComponentPage(match.params.component) && (
              <div className="simulator">
                <iframe src={`${window.location.protocol}//${window.location.host}/demo.html#/${match.params.component}`} title="simulator" frameBorder="0" />
              </div>
            )
          }
          <div className={containerCls}>
            <Switch>
              {
                documents.map((doc, i) => (
                  <Route key={+i} path={`/components/${Format.camel2Dash(doc.name)}`} component={LoadableComponent(doc)} />
                ))
              }
              {
                [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
                  <Route key={+i} path={`/components/${Format.camel2Dash(component.name)}`} component={LoadableComponent(component)} />
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
