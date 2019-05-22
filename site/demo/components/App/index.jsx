import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Loading } from 'zarm';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import FastClick from 'fastclick';
import Format from '@site/utils/format';
import { components } from '@site/site.config';
import Markdown from '@site/demo/components/Markdown';
import './style.scss';

const HAS_STYLE_COMPONENT = [
  'Badge', 'Button', 'Calendar', 'Carousel',
  'Cell', 'Checkbox', 'FilePicker', 'Icon', 'Message',
  'NoticeBar', 'Panel', 'Picker', 'Popup', 'Progress',
  'Pull', 'Radio', 'SearchBar', 'Tabs', 'Toast', 'Tooltip',
];

const LoadablePage = (loader) => {
  return Loadable({
    loader,
    loading: () => <Loading visible />,
  });
};

const LoadableComponent = (component) => {
  const loader = { page: component.module };

  if (HAS_STYLE_COMPONENT.indexOf(component.name) > -1) {
    loader.style = () => import(`@site/demo/styles/${component.name}Page`);
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => (
      <Markdown
        document={loaded.page.default}
        className={`${Format.camel2Dash(component.name)}-page`}
        {...props}
      />
    ),
    loading: () => <Loading visible />,
  });
};

class App extends Component {
  // componentDidMount() {
  //   Events.on(window, 'resize', window.__setFontSize__);
  //   FastClick.attach(document.body);
  // }

  render() {
    const { history, location, match } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const { form, feedback, view, navigation, other } = components;

    return (
      // <TransitionGroup>
      //   <CSSTransition
      //     appear
      //     key={currentKey}
      //     timeout={300}
      //     classNames={(history.action === 'PUSH' || (history.action === 'POP' && !match.isExact)) ? 'out' : 'in'}
      //   >
      //     <section>
      //       <Switch key={location.pathname} location={location}>
      //         <Route exact path="/" component={LoadablePage(() => import('@site/demo/pages/Index'))} />
      //         {
      //           [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => {
      //             return <Route key={+i} path={`/${Format.camel2Dash(component.name)}`} component={LoadableComponent(component)} />;
      //           })
      //         }
      //         <Route component={LoadablePage(() => import('@site/demo/pages/NotFoundPage'))} />
      //       </Switch>
      //     </section>
      //   </CSSTransition>
      // </TransitionGroup>
      <Switch key={location.pathname} location={location}>
        <Route exact path="/" component={LoadablePage(() => import('@site/demo/pages/Index'))} />
        {
          [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
            <Route key={+i} path={`/${Format.camel2Dash(component.name)}`} component={LoadableComponent(component)} />
          ))
        }
        <Route component={LoadablePage(() => import('@site/demo/pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default hot(module)(withRouter(App));
