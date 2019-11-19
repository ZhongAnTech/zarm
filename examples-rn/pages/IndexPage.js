import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Panel, Cell } from '../../components/index.native';
import { form, feedback, view, navigation } from '../demos';
import Container from '../components/Container';
import Footer from '../components/Footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  brand: {
    padding: 45,
    paddingBottom: 15,
  },
  brandTitle: {
    fontSize: 30,
  },
  brandDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default class Index extends PureComponent {
  render() {
    const { navigation: navigationProp } = this.props;
    const { navigate } = navigationProp;

    return (
      <Container style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.brandTitle}>Zarm UI</Text>
          <Text style={styles.brandDescription}>众安科技移动端组件库</Text>
        </View>
        <View style={styles.main}>
          <Panel title={`数据录入（${form.length}）`}>
            {
              form.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => navigate(component.title)} />
              ))
            }
          </Panel>
          <Panel title={`操作反馈（${feedback.length}）`}>
            {
              feedback.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => navigate(component.title)} />
              ))
            }
          </Panel>
          <Panel title={`数据展示（${view.length}）`}>
            {
              view.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => navigate(component.title)} />
              ))
            }
          </Panel>
          <Panel title={`导航（${navigation.length}）`}>
            {
              navigation.map((component, i) => (
                <Cell key={+i} hasArrow title={component.description} onClick={() => navigate(component.title)} />
              ))
            }
          </Panel>
        </View>
        <Footer />
      </Container>
    );
  }
}
