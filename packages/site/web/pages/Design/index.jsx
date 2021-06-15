import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { design } from '@/site.config';
import Container from '@/web/components/Container';
import './style.scss';

const Page = () => {
  return (
    <Suspense fallback={() => null}>
      <Container className="design-page">
        <main>
          <div className="main-container markdown">
            <Switch>
              {design.map((doc, i) => (
                <Route key={+i} path={`/design/${doc.key}`} component={lazy(doc.module)} />
              ))}
              <Redirect to="/" />
            </Switch>
          </div>
        </main>
      </Container>
    </Suspense>
  );
};

export default Page;
