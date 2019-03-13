import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'dragon-ui';
import AsyncComponent from '@site/components/AsyncComponent';
import { components } from '@/examples/demos';
import Format from '@site/utils/format';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import SideBar from '@site/components/SideBar';
import ScrollToTop from '@site/components/ScrollToTop';
import './style.scss';

class Page extends PureComponent {
  render() {
    const { match } = this.props;
    const { form, feedback, view, navigation, other } = components;
    return (
      <Container className="components-page">
        <Header />
        <main>
          <SideBar />
          <div className="simulator">
            <iframe src={`${window.location.protocol}//${window.location.host}/demo.html#/${match.params.component}`} title="simulator" frameBorder="0" style={{ width: 375, height: 667 }} />
          </div>
          <div className="main-container">
            <Switch>
              {
                [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
                  <Route key={+i} path={`/components/${Format.camel2Dash(component.name)}`} component={AsyncComponent(() => import(`./${component.name}`))} />
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
      </Container>
    );
  }
}

export default withRouter(Page);
