import React, { PureComponent } from 'react';
import { Panel, Cell } from 'zarm';
import { components } from '../demos';
import Format from '../utils/format';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/components/Header.scss';
import '../styles/pages/IndexPage.scss';

class Page extends PureComponent {
  getMenu = (groupName, key) => {
    const { history } = this.props;
    return (
      <Panel title={`${groupName}（${components[key].length}）`}>
        {
          components[key].map((component, i) => (
            <Cell
              hasArrow
              key={+i}
              title={
                <div className="menu-item-content">
                  <span>{component.name}</span>
                  <span className="chinese">{component.description}</span>
                </div>
              }
              onClick={() => history.push(`/${Format.camel2Dash(component.name)}`)}
            />
          ))
        }
      </Panel>
    );
  }

  render() {
    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm UI</div>
            <div className="brand-description">众安科技移动端组件库</div>
          </section>
        </header>
        <main>
          {this.getMenu('数据录入', 'form')}
          {this.getMenu('操作反馈', 'feedback')}
          {this.getMenu('数据展示', 'view')}
          {this.getMenu('导航', 'navigation')}
          {this.getMenu('其他', 'other')}
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
