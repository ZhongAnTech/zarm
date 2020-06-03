import React, { useState } from 'react';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { Icon } from 'zarm';
import { documents, components } from '@site/site.config';
import Container from '@site/web/components/Container';
import Header from '@site/web/components/Header';
import SideBar from '@site/web/components/SideBar';
import Footer from '@site/web/components/Footer';
import Markdown from '@site/web/components/Markdown';
import './style.scss';

const isComponentPage = (page) => ['introduce', 'quick-start', 'change-log'].indexOf(page) === -1;

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      return <Markdown document={loaded.default} component={component} {...props} />;
    },
    loading: () => null,
  });
};

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_jg2hhwrcth8.js');

const Page = () => {
  const { general, form, feedback, view, navigation, other } = components;
  const params = useParams();
  const [affix, setAffix] = useState(true);

  const containerCls = classnames('main-container', {
    'no-simulator': !isComponentPage(params.component),
  });

  const simulatorCls = classnames('simulator', {
    'simulator--affix': affix,
  });

  return (
    <Container className="components-page">
      <Header />
      <main>
        <SideBar />
        {
          isComponentPage(params.component) && (
            <div className={simulatorCls}>
              <div className="simulator__control" onClick={() => setAffix(!affix)} title={affix ? '取消悬浮' : '设置悬浮'}>
                <Icons type="affix" size="sm" />
              </div>
              <iframe src={`${window.location.protocol}//${window.location.host}/demo.html#/${params.component}`} title="simulator" frameBorder="0" />
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
      </main>
      <Footer />
    </Container>
  );
};

export default Page;
