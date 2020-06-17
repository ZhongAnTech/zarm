import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
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

const Page = () => {
  return (
    <Container className="design-page">
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
      </main>
      {/* <Footer /> */}
    </Container>
  );
};

export default Page;
