import React, { PureComponent } from 'react';
import { Panel, Cell } from 'zarm';
import { components } from '@site/site.config';
import ChangeCase from 'change-case';
import Container from '@site/demo/components/Container';
import Footer from '@site/demo/components/Footer';
import './style.scss';

class Page extends PureComponent {
  getMenus = (groupName, key) => {
    const { history } = this.props;
    const list = components[key] || [];

    return (
      <Panel title={`${groupName}（${list.length}）`}>
        {
          list
            .sort((a, b) => {
              return a.key.localeCompare(b.key);
            })
            .map((component, i) => (
              <Cell
                hasArrow
                key={+i}
                title={(
                  <div className="menu-item-content">
                    <span>{ChangeCase.pascalCase(component.key)}</span>
                    <span className="chinese">{component.name}</span>
                  </div>
                )}
                onClick={() => history.push(`/${component.key}`)}
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
          {this.getMenus('通用', 'general')}
          {this.getMenus('数据录入', 'form')}
          {this.getMenus('操作反馈', 'feedback')}
          {this.getMenus('数据展示', 'view')}
          {this.getMenus('导航', 'navigation')}
          {this.getMenus('其他', 'other')}
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
