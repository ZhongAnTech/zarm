import React, { Component } from 'react';
import { Panel, Cell, Toast, DateSelect, DatePicker, DatePickerView, Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import format from '../utils/format';

class Page extends Component {

  constructor() {
    super();
    this.state = {
      date: {
        visible: false,
        value: '',
      },
      time: {
        visible: false,
        value: '',
      },
      limitDate: {
        visible: false,
        value: '2017-07-04',
      },
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   const { year } = this.state;
    //   this.setState({
    //     year: {
    //       ...year,
    //       value: '2019',
    //     },
    //   });
    // }, 500);
  }

  toggle = (key) => {
    const state = this.state[key];
    state.visible = !state.visible;
    this.setState({ [`${key}`]: state });
  }

  render() {
    const { date, time, limitDate } = this.state;
    return (
      <Container className="picker-page">
        <Header title="日期选择器 DatePicker" />
        <main>
          <Panel>
            <Panel.Header title="日期选择器" />
            <Panel.Body>
              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('date')}>选择</Button>
                }>选择日期</Cell>

              <Cell
                description={
                  <Button size="sm" onClick={() => this.toggle('time')}>选择</Button>
                }>选择时间</Cell>

              <Cell
                description={
                  <DatePicker
                    title="选择日期"
                    placeholder="请选择日期"
                    mode="date"
                    min="2007-01-03"
                    max="2019-11-23"
                    value={limitDate.value}
                    onOk={(value) => {
                      this.setState({
                        limitDate: {
                          visible: false,
                          value,
                        },
                      });
                      Toast.show(format.date(value, 'yyyy年MM月dd日'));
                    }}>
                    <Button size="sm">选择</Button>
                  </DatePicker>
                }>选择日期(自定义)</Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="平铺日期选择器" />
            <Panel.Body>
              <DatePickerView
                mode="datetime"
                min="2018-1-13"
                onChange={(value) => {
                  console.log('datePickerView => ', value);
                }}
                />
            </Panel.Body>
          </Panel>

          <DatePicker
            visible={date.visible}
            title="选择日期"
            placeholder="请选择日期"
            mode="date"
            value={date.value}
            onOk={(value) => {
              this.setState({
                date: {
                  visible: false,
                  value,
                },
              });
              Toast.show(format.date(value, 'yyyy/MM/dd'));
            }}
            onCancel={() => this.toggle('date')}
            />

          <DatePicker
            visible={time.visible}
            title="选择日期"
            placeholder="请选择日期"
            mode="time"
            value={time.value}
            onOk={(value) => {
              this.setState({
                time: {
                  visible: false,
                  value,
                },
              });
              Toast.show(format.date(value, 'hh时mm分'));
            }}
            onCancel={() => this.toggle('time')}
            />

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
