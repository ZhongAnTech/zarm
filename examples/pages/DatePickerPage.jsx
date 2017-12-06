import React, { Component } from 'react';
import { Panel, Cell, DateSelect, DatePicker, DatePickerView, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import format from '../utils/format';

class Page extends Component {

  constructor() {
    super();
    this.state = {
      year: '',
      date: '2009-03-04',
      dateVisible: false,
      customDate: '',
      time: '',
      datetime: '',
    };
  }

  open = (key) => {
    this.setState({
      [`${key}`]: true,
    });
  }

  close = (key) => {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    const { year, date, dateVisible, time, datetime, customDate } = this.state;
    return (
      <Container className="picker-page">
        <Header title="日期选择器 DatePicker" />
        <main>
          <Panel>
            <Panel.Header title="日期选择器" />
            <Panel.Body>
              <Cell title="年份选择">
                <DateSelect
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  value={year}
                  onChange={(value) => {
                    this.setState({
                      year: value,
                    });
                  }}
                  />
              </Cell>

              <Cell title="日期选择" description={<Button theme="primary" size="sm" onClick={() => { this.open('dateVisible'); }}>请选择日期</Button>}>
                {date ? <div className="">{format.date(date, 'yyyy-MM-dd')}</div> : <div className="za-picker-placeholder show-right">请选择日期</div>}
                <DatePicker
                  visible={dateVisible}
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  value={date}
                  min="2007-01-03"
                  max="2017-11-23"
                  onOk={(value) => {
                    this.setState({ date: value, dateVisible: false });
                  }}
                  onCancel={() => this.close('dateVisible')}
                  />
              </Cell>

              <Cell title="时间选择">
                <DateSelect
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  value={time}
                  minuteStep={15}
                  onChange={(value) => {
                    this.setState({
                      time: value,
                    });
                  }}
                  />
              </Cell>

              <Cell title="日期&时间">
                <DateSelect
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="datetime"
                  value={datetime}
                  onChange={(value) => {
                    this.setState({
                      datetime: value,
                    });
                  }}
                  />
              </Cell>

              <Cell title="自定义格式">
                <DateSelect
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  format="yyyy年MM月dd日"
                  value={customDate}
                  onChange={(value) => {
                    this.setState({
                      customDate: value,
                    });
                  }}
                  />
              </Cell>

            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="平铺日期选择器" />
            <Panel.Body>
              <DatePickerView
                mode="date"
                onChange={(value) => {
                  console.log('datePickerView => ', value);
                }}
                />
            </Panel.Body>
          </Panel>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
