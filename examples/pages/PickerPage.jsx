import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Cell, Picker } from '../../components';
import District from './district';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      single: {},
      diy: {},
    };
  }

  render() {
    const { single, diy } = this.state;

    return (
      <Container className="cell-page">
        <Header title="选择器 Picker" />
        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>基本</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="单列">
                <Picker
                  dataSource={[
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  value={single.value}
                  onOk={(selected) => {
                    single.value = selected.value;
                    this.setState({
                      single,
                    });
                    console.log(`selected ${single.value}`);
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

              <Cell title="多列">
                <Picker
                  dataSource={[
                    [
                      { value: '1', label: '选项一' },
                      { value: '2', label: '选项二' },
                    ],
                    [
                      { value: 'a', label: '选项A' },
                      { value: 'b', label: '选项B' },
                    ],
                  ]}
                  />
              </Cell>

              <Cell title="多列联动">
                <Picker
                  dataSource={[
                    {
                      value: '1',
                      label: '北京市',
                      children: [
                        { value: '11', label: '海淀区' },
                        { value: '12', label: '西城区' },
                      ],
                    },
                    {
                      value: '2',
                      label: '上海市',
                      children: [
                        { value: '21', label: '黄埔区' },
                        { value: '22', label: '虹口区' },
                      ],
                    },
                  ]}
                  />
              </Cell>

              <Cell title="指定默认值">
                <Picker
                  dataSource={[
                    {
                      value: '1',
                      label: '北京市',
                      children: [
                        { value: '11', label: '海淀区' },
                        { value: '12', label: '西城区' },
                      ],
                    },
                    {
                      value: '2',
                      label: '上海市',
                      children: [
                        { value: '21', label: '黄埔区' },
                        { value: '22', label: '虹口区' },
                      ],
                    },
                  ]}
                  defaultValue={['1', '12']}
                  />
              </Cell>

              <Cell title="禁止修改">
                <Picker
                  disabled
                  dataSource={[
                    { value: '1', label: '选项一' },
                    { value: '2', label: '选项二' },
                  ]}
                  defaultValue="2"
                  />
              </Cell>

              <Cell title="自定义格式">
                <Picker
                  visible={diy.visible}
                  title="自定义标题"
                  placeholder="自定义placeholder"
                  format="/"
                  dataSource={[
                    {
                      idCardType: 1,
                      idCardName: '身份证',
                    },
                    {
                      idCardType: 2,
                      idCardName: '护照',
                    },
                    {
                      idCardType: 3,
                      idCardName: '出生证',
                    },
                  ]}
                  displayMember="idCardName"
                  valueMember="idCardType"
                  value={diy.value}
                  onOk={(selected) => {
                    diy.value = selected.idCardType;
                    this.setState({
                      diy,
                    });
                  }}
                  onCancel={() => {
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>城市选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="省市选择">
                <Picker dataSource={District} cols={2} />
              </Cell>

              <Cell title="省市区选择">
                <Picker dataSource={District} />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>日期选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>

              <Cell title="年份选择">
                <Picker.Date
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  wheelDefaultValue="2009"
                  />
              </Cell>

              <Cell title="日期选择">
                <Picker.Date
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  />
              </Cell>

              <Cell title="时间选择">
                <Picker.Date
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  minuteStep={15}
                  />
              </Cell>

              <Cell title="日期&时间">
                <Picker.Date mode="datetime" />
              </Cell>

              <Cell title="自定义格式">
                <Picker.Date
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  format="YYYY年MM月DD日"
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>层叠式选择器</Panel.Title>
            </Panel.Header>
            <Panel.Body>
              <Cell title="级联选择">
                <Picker.Stack
                  dataSource={District}
                  displayRender={selected => selected.map(item => item.label).join('-')}
                  />
              </Cell>

            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
