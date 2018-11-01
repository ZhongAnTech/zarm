import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'dragon-ui';
import AsyncComponent from '@site/components/AsyncComponent';
import { documents } from '@site/demos';
import Format from '@site/utils/format';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import SideBar from '@site/components/SideBar';
import ScrollToTop from '@site/components/ScrollToTop';
import './style.scss';

class Page extends PureComponent {
  render() {
    return (
      <Container className="documents-page">
        <Header />
        <main>
          <SideBar />
          <div className="main-container">
            <Switch>
              {
                documents.map((doc, i) => (
                  <Route key={+i} path={`/documents/${Format.camel2Dash(doc.name)}`} component={AsyncComponent(() => import(`./${doc.name}`))} />
                ))
              }
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
