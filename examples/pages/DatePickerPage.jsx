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
      yearVisible: false,
      date: '2009-03-04',
      dateVisible: false,
      customDate: '',
      customVisible: false,
      time: '',
      timeVisible: '',
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
    const { year, yearVisible, date, dateVisible, time, timeVisible, datetime, datetimeVisible, customDate, customVisible } = this.state;
    return (
      <Container className="picker-page">
        <Header title="日期选择器 DatePicker" />
        <main>
          <Panel>
            <Panel.Header title="日期选择器" />
            <Panel.Body>
              <Cell title="年份选择" hasArrow onClick={() => { this.open('yearVisible'); }}>
                {year ? <div className="show-right">{format.date(year, 'yyyy年')}</div> : <div className="za-picker-placeholder show-right">选择年份</div>}
                <DatePicker
                  visible={yearVisible}
                  title="选择年份"
                  placeholder="请选择年份"
                  mode="year"
                  value={year}
                  onOk={(value) => {
                    this.setState({ year: value, yearVisible: false });
                  }}
                  onCancel={() => this.close('yearVisible')}
                  />
              </Cell>

              <Cell title="日期选择" description={<Button theme="primary" size="sm" onClick={() => { this.open('dateVisible'); }}>选择日期</Button>}>
                {date && <div className="">{format.date(date, 'yyyy-MM-dd')}</div>}
                <DatePicker
                  visible={dateVisible}
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="date"
                  value={date}
                  min="2007-01-03"
                  max="2018-11-23"
                  onOk={(value) => {
                    this.setState({ date: value, dateVisible: false });
                  }}
                  onCancel={() => this.close('dateVisible')}
                  />
              </Cell>

              <Cell title="时间选择" description={<Button theme="primary" size="sm" onClick={() => { this.open('timeVisible'); }}>选择时间</Button>}>
                {time && <div className="">{format.date(time, 'hh时mm分')}</div>}
                <DatePicker
                  visible={timeVisible}
                  title="选择时间"
                  placeholder="请选择时间"
                  mode="time"
                  value={time}
                  minuteStep={15}
                  onOk={(value) => {
                    this.setState({ time: value, timeVisible: false });
                  }}
                  onCancel={() => this.close('timeVisible')}
                  />
              </Cell>

              <Cell title="日期&时间" description={<Button theme="primary" size="sm" onClick={() => { this.open('datetimeVisible'); }}>选择日期和时间</Button>}>
                {datetime && <div className="">{format.date(datetime, 'yyyy/MM/dd hh:mm')}</div>}
                <DatePicker
                  visible={datetimeVisible}
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="datetime"
                  value={datetime}
                  onOk={(value) => {
                    this.setState({ datetime: value, datetimeVisible: false });
                  }}
                  onCancel={() => this.close('datetimeVisible')}
                  />
              </Cell>

              <Cell title="自定义格式" description={<Button theme="primary" size="sm" onClick={() => { this.open('customVisible'); }}>请选择</Button>}>
                {customDate && <div className="">{format.date(customDate, 'yyyy年MM月dd日 hh时mm分')}</div>}
                <DatePicker
                  visible={customVisible}
                  title="选择日期"
                  placeholder="请选择日期"
                  mode="datetime"
                  value={customDate}
                  onOk={(value) => {
                    this.setState({ customDate: value, customVisible: false });
                  }}
                  onCancel={() => this.close('customVisible')}
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
