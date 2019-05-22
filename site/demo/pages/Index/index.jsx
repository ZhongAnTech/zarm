import React, { PureComponent } from 'react';
import { Panel, Cell } from 'zarm';
import { components } from '@site/site.config';
import Format from '@site/utils/format';
import Container from '@site/demo/components/Container';
import Footer from '@site/demo/components/Footer';
import './style.scss';

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
              title={(
                <div className="menu-item-content">
                  <span>{component.name}</span>
                  <span className="chinese">{component.description}</span>
                </div>
              )}
              onClick={() => history.push(`/${Format.camel2Dash(component.name)}`)}
            />
          ))
        }
      </Panel>
    );
  };

  render() {
    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm</div>
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
