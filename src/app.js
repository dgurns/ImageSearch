import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import store from './store';

import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';

class App extends Component {
  render() {
    const MainNavigator = StackNavigator({
        main: { screen: MainScreen },
        detail: { screen: DetailScreen }
      });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
