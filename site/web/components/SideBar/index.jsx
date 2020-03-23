import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import ChangeCase from 'change-case';
import { Menu } from 'dragon-ui';
import { documents, components } from '@site/site.config';
import './style.scss';

class SideBar extends PureComponent {
  getDocs = () => {
    return documents.map((doc) => (
      <Menu.Item
        key={doc.key}
      >
        <a href={`#/components/${doc.key}`}>
          {doc.name}
        </a>
      </Menu.Item>
    ));
  };

  getMenus = (groupName, key) => {
    const list = components[key] || [];

    return (
      <Menu.SubMenu title={groupName} key={key}>
        {
          list
            .sort((a, b) => {
              return a.key.localeCompare(b.key);
            })
            .map((component) => (
              <Menu.Item key={component.key}>
                <a href={`#/components/${component.key}`}>
                  <span>{ChangeCase.pascalCase(component.key)}</span>
                  <span className="chinese">{component.name}</span>
                </a>
              </Menu.Item>
            ))
        }
      </Menu.SubMenu>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div className="side-bar">
        <div className="menu">
          <Menu
            defaultOpenKeys={['components', 'general', 'form', 'feedback', 'view', 'navigation', 'other']}
            selectedKeys={[match.params.document, match.params.component]}
          >
            {this.getDocs()}
            <Menu.SubMenu title="组件" key="components">
              {this.getMenus('通用', 'general')}
              {this.getMenus('数据录入', 'form')}
              {this.getMenus('数据展示', 'view')}
              {this.getMenus('操作反馈', 'feedback')}
              {this.getMenus('导航', 'navigation')}
              {this.getMenus('其他', 'other')}
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);
