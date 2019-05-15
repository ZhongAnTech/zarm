import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'dragon-ui';
import { documents, components } from '@site/site.config';
import Format from '@site/utils/format';
import './style.scss';

class SideBar extends PureComponent {
  getDocs = () => {
    return documents.map(doc => (
      <Menu.Item
        key={Format.camel2Dash(doc.name)}
      >
        <a href={`#/components/${Format.camel2Dash(doc.name)}`}>
          {doc.description}
        </a>
      </Menu.Item>
    ));
  };

  getMenus = (groupName, key) => {
    return (
      <Menu.SubMenu title={groupName} key={key}>
        {
          components[key].map(component => (
            <Menu.Item key={Format.camel2Dash(component.name)}>
              <a href={`#/components/${Format.camel2Dash(component.name)}`}>
                <span>{component.name}</span>
                <span className="chinese">{component.description}</span>
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
            defaultOpenKeys={['components', 'form', 'feedback', 'view', 'navigation', 'other']}
            selectedKeys={[match.params.document, match.params.component]}
          >
            {this.getDocs()}
            <Menu.SubMenu title="组件" key="components">
              {this.getMenus('数据录入', 'form')}
              {this.getMenus('操作反馈', 'feedback')}
              {this.getMenus('数据展示', 'view')}
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
