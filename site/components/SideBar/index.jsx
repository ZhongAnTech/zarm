import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'dragon-ui';
import { components, documents } from '@site/demos';
import Format from '@site/utils/format';
import './style.scss';

class SideBar extends PureComponent {
  getMenu = (groupName, key) => {
    const { history } = this.props;
    return (
      <Menu.SubMenu title={groupName} key={key}>
        {
          components[key].map(component => (
            <Menu.Item key={Format.camel2Dash(component.name)} onClick={() => history.replace(`/components/${Format.camel2Dash(component.name)}`)}>
              <div className="menu-item-content">
                <span>{component.name}</span>
                <span className="chinese">{component.description}</span>
              </div>
            </Menu.Item>
          ))
        }
      </Menu.SubMenu>
    );
  }

  render() {
    const { history, match } = this.props;    
    return (
      <div className="side-bar">
        <div className="menu">
          <Menu
            defaultOpenKeys={['components', 'form', 'feedback', 'view', 'navigation']}
            defaultSelectedKeys={[match.params.component]}
          >
            {documents.map(doc => <Menu.Item key={Format.camel2Dash(doc.name)} onClick={() => history.replace(`/documents/${Format.camel2Dash(doc.name)}`)}>{doc.description}</Menu.Item>)}
            <Menu.SubMenu title="组件" key="components">
              {this.getMenu('数据录入', 'form')}
              {this.getMenu('操作反馈', 'feedback')}
              {this.getMenu('数据展示', 'view')}
              {this.getMenu('导航', 'navigation')}
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);
