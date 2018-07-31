import React, { PureComponent } from 'react';
import { Panel, Cell } from 'zarm';
import { form, feedback, view, navigation } from '../demos';
import Format from '../utils/format';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/components/Header.scss';
import '../styles/pages/IndexPage.scss';

class Page extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm UI</div>
            <div className="brand-description">众安科技移动端组件库</div>
          </section>
        </header>
        <main>
          <Panel titleRender={`数据录入（${form.length}）`}>
            {
              form.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => history.push(`/${Format.camel2Dash(component.title)}`)} />
              ))
            }
          </Panel>
          <Panel titleRender={`操作反馈（${feedback.length}）`}>
            {
              feedback.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => history.push(`/${Format.camel2Dash(component.title)}`)} />
              ))
            }
          </Panel>
          <Panel titleRender={`数据展示（${view.length}）`}>
            {
              view.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => history.push(`/${Format.camel2Dash(component.title)}`)} />
              ))
            }
          </Panel>
          <Panel titleRender={`导航（${navigation.length}）`}>
            {
              navigation.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => history.push(`/${Format.camel2Dash(component.title)}`)} />
              ))
            }
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
