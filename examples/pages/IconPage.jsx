import React, { Component } from 'react';
import Header from '../components/Header';
import { Panel, Icon } from '../../components';
import '../styles/pages/IconPage';

const ICONS = [
  'right', 'right-round', 'right-round-fill',
  'wrong', 'wrong-round', 'wrong-round-fill',
  'info-round', 'info-round-fill',
  'question-round', 'question-round-fill',
  'warning-round', 'warning-round-fill',
  'arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom',
  'add', 'add-round', 'add-round-fill',
  'minus', 'minus-round', 'minus-round-fill',
  'date',
  'loading',
]
class Page extends Component {

  render() {
    let ele = [];
    let childEle = [];

    for (var i = 0; i < ICONS.length; i++) {
      childEle.push(
        <div className="grid-column" key={`column-${i}`}>
          <Icon theme="info" type={ICONS[i]} />
          <span>{ICONS[i]}</span>
        </div>
      );

      if (i % 3 === 2) {
        ele.push(<div className="grid-row" key={`row-${(i + 1) / 3}`}>{childEle}</div>);
        childEle = [];
      }
    }

    return (
      <div className="icon-page">
        <Header title="图标 Icon" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <div className="grid">{ele}</div>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default Page;
