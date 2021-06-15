import React, { useState, useContext, useRef, useEffect } from 'react';
import { Route, Switch, Redirect, useParams, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'zarm';
import { documents, components } from '@/site.config';
import Context from '@/utils/context';
import Container from '@/web/components/Container';
import SideBar from '@/web/components/SideBar';
import Footer from '@/web/components/Footer';
import Markdown from '@/web/components/Markdown';
import './style.scss';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      return <Markdown document={loaded.default} component={component} {...props} />;
    },
    loading: () => null,
  });
};

const Icons = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const Simulator = () => {
  const params = useParams();
  const simulatorRef = useRef();
  const { locale } = useContext(Context);
  const [affix, setAffix] = useState(JSON.parse(window.localStorage['simulator-affix'] || false));

  const simulatorCls = classnames('simulator', {
    'simulator--affix': affix,
  });

  useEffect(() => {
    !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) &&
      simulatorRef.current.contentWindow.postMessage({ locale });
  }, [locale]);

  return (
    <div className={simulatorCls}>
      <FormattedMessage id={`app.home.components.simulator.${affix ? 'unaffix' : 'affix'}`}>
        {(txt) => (
          <div
            className="simulator__control"
            onClick={() => {
              setAffix(!affix);
              window.localStorage['simulator-affix'] = !affix;
            }}
            title={txt}
          >
            <Icons type="affix" size="sm" />
          </div>
        )}
      </FormattedMessage>
      <iframe
        ref={simulatorRef}
        src={`${window.location.protocol}//${window.location.host}/demo.html#/${params.component}`}
        title="simulator"
        frameBorder="0"
      />
    </div>
  );
};

const Page = () => {
  const { general, form, feedback, view, navigation, other } = components;
  const isComponentPage = !!useRouteMatch('/components');

  const containerCls = classnames('main-container', 'markdown', {
    'no-simulator': !isComponentPage,
  });

  return (
    <Container className="components-page">
      <main>
        <SideBar />
        {isComponentPage && <Simulator />}
        <div className={containerCls}>
          <Switch>
            {documents.map((doc, i) => (
              <Route key={+i} path={`/docs/${doc.key}`} component={LoadableComponent(doc)} />
            ))}
            {[...general, ...form, ...feedback, ...view, ...navigation, ...other].map(
              (component, i) => (
                <Route
                  key={+i}
                  path={`/components/${component.key}`}
                  component={LoadableComponent(component)}
                />
              ),
            )}
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default Page;
