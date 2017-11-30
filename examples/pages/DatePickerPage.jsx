import React, { Component } from 'react';
import { Panel, Cell, DatePicker } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Page extends Component {

  render() {
    return (
      <Container className="picker-page">
        <Header title="日期选择器 DatePicker" />
        <main>
          <Panel>
            <Panel.Header title="日期选择器" />
            <Panel.Body>

              <Cell title="年份选择">
                <DatePicker
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  wheelDefaultValue="2009"
                  />
              </Cell>

              <Cell title="日期选择">
                <DatePicker
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  value="2009-03-04"
                  min="2007-01-03"
                  max="2017-11-23"
                  />
              </Cell>

              <Cell title="时间选择">
                <DatePicker
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  minuteStep={15}
                  />
              </Cell>

              <Cell title="日期&时间">
                <DatePicker mode="datetime" />
              </Cell>

              <Cell title="自定义格式">
                <DatePicker
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  format="yyyy年MM月dd日"
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
