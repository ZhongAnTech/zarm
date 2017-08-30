import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Picker } from '../../components';
import '../styles/pages/BadgePage';

class Page extends Component {
  state = {
    single:{}
  }
  render() {
    const {single} = this.state
    return (
      <Container className="test">
        <Header title="Test" />
        <main>
          <Picker
            visible={single.visible}
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
            value={single.value}
            displayMember="idCardName"
            valueMember="idCardType"
            onOk={(value) => {
              console.log('pickerPage onOk ->', value);
              const _value = value.idCardType;
              single.value = _value;
              this.setState({
                single,
              });
            }}
            onCancel={() => {
            }}
            />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
