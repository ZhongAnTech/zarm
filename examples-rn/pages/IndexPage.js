import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { UIFORM, UICONROL, UIVIEW } from '../demoList';
import Container from '../components/Container';
import Footer from '../components/Footer';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 15,
  },
  brand: {
    padding: 30,
    paddingBottom: 0,
  },
  brandTitle: {
    fontSize: 30,
  },
  brandDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default class Index extends PureComponent<{}> {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.brandTitle}>Zarm UI</Text>
          <Text style={styles.brandDescription}>众安科技移动端组件库</Text>
        </View>
        <View style={styles.main}>
          {
            [...UIFORM, ...UICONROL, ...UIVIEW].map((component, i) => (
              <Button
                key={+i}
                onPress={() => navigate(component.title)}
                title={`${component.description} ${component.title}`}
                />
            ))
          }
        </View>
        <Footer />
      </Container>
    );
  }
}
