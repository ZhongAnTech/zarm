import { assets, components, documents } from '@/site.config';
import Context from '@/utils/context';
import Container from '@/web/components/Container';
import Footer from '@/web/components/Footer';
import Markdown from '@/web/components/Markdown';
import SideBar from '@/web/components/SideBar';
import classnames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import React, { lazy, Suspense, useContext, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { Icon, Tooltip } from 'zarm';
import './style.scss';

const LoadableComponent = (component) => {
  const LazyComponent = lazy(() =>
    component.module().then((loaded) => ({
      default: (props) => <Markdown document={loaded.default} component={component} {...props} />,
    })),
  );

  return (props) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const Icons = Icon.createFromIconfont(assets.iconfont);

const Simulator = () => {
  const params = useParams();
  const simulatorRef = useRef();
  const { locale } = useContext(Context);
  const [affix, setAffix] = useState(JSON.parse(window.localStorage['simulator-affix'] || false));

  React.useEffect(() => {
    !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) &&
      simulatorRef.current.contentWindow.postMessage({ locale }, '*');
  }, [locale]);

  const simulatorURL = `${window.location.protocol}//${window.location.host}/demo.html#/${params.component}`;

  const handleReload = () => {
    simulatorRef.current?.contentWindow.location.reload();
  };

  return (
    <div
      className={classnames('simulator', {
        'simulator--affix': affix,
      })}
    >
      <div className="simulator__controls">
        <FormattedMessage id={`app.home.components.simulator.${affix ? 'unaffix' : 'affix'}`}>
          {(txt) => (
            <Tooltip
              arrowPointAtCenter
              content={txt}
              direction="left"
              observeResize={false}
              trigger="hover"
            >
              <div
                aria-label={txt}
                className={classnames('simulator__control', {
                  'simulator__control--active': affix,
                })}
                onClick={() => {
                  setAffix(!affix);
                  window.localStorage['simulator-affix'] = !affix;
                }}
              >
                <Icons type="pin" size="sm" />
              </div>
            </Tooltip>
          )}
        </FormattedMessage>
        <FormattedMessage id="app.home.components.simulator.qrcode">
          {(txt) => (
            <Tooltip
              arrowPointAtCenter
              className="simulator__qrcode"
              content={<QRCodeSVG value={simulatorURL} size={120} style={{ display: 'block' }} />}
              direction="left-top"
              observeResize={false}
              trigger="hover"
            >
              <div aria-label={txt} className="simulator__control">
                <Icons type="qrcode" size="sm" />
              </div>
            </Tooltip>
          )}
        </FormattedMessage>
        <FormattedMessage id="app.home.components.simulator.openwindow">
          {(txt) => (
            <Tooltip
              arrowPointAtCenter
              content={txt}
              direction="left"
              observeResize={false}
              trigger="hover"
            >
              <div
                aria-label={txt}
                className="simulator__control"
                onClick={() => window.open(simulatorURL)}
              >
                <Icons type="link" size="sm" />
              </div>
            </Tooltip>
          )}
        </FormattedMessage>
        <FormattedMessage id="app.home.components.simulator.reload">
          {(txt) => (
            <Tooltip
              arrowPointAtCenter
              content={txt}
              direction="left"
              observeResize={false}
              trigger="hover"
            >
              <div aria-label={txt} className="simulator__control" onClick={handleReload}>
                <Icons type="reload" size="sm" />
              </div>
            </Tooltip>
          )}
        </FormattedMessage>
      </div>
      <iframe ref={simulatorRef} src={simulatorURL} title="simulator" frameBorder="0" />
    </div>
  );
};

const Page = () => {
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
            {Object.values(documents)
              .flat()
              .map((doc, i) => (
                <Route key={+i} path={`/docs/${doc.key}`} component={LoadableComponent(doc)} />
              ))}
            {Object.values(components)
              .flat()
              .map((comp, i) => (
                <Route
                  key={+i}
                  path={`/components/${comp.key}`}
                  component={LoadableComponent(comp)}
                />
              ))}
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default Page;
