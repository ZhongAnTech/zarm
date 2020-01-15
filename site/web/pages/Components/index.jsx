import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { Icon } from 'zarm';
import { documents, components } from '@site/site.config';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import SideBar from '@site/web/components/SideBar';
import ScrollToTop from '@site/web/components/ScrollToTop';
import Markdown from '@site/web/components/Markdown';
import './style.scss';

const isComponentPage = (page) => ['introduce', 'quick-start', 'change-log'].indexOf(page) === -1;

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      const C = loaded.default;
      return <Markdown document={C} component={component} {...props} />;
    },
    loading: () => null,
  });
};

class Page extends PureComponent {
  render() {
    const { match } = this.props;
    const { general, form, feedback, view, navigation, other } = components;

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
                  <Route key={+i} path={`/components/${doc.key}`} component={LoadableComponent(doc)} />
                ))
              }
              {
                [...general, ...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
                  <Route key={+i} path={`/components/${component.key}`} component={LoadableComponent(component)} />
                ))
              }
              <Redirect to="/" />
            </Switch>
          </div>
          <ScrollToTop>
            <div className="scroll-to-top">
              <Icon type="arrow-top" size="sm" />
            </div>
          </ScrollToTop>
        </main>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default withRouter(Page);
