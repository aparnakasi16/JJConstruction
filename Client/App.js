import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/Navigation/StackNavigation/AuthStack';
import { store } from './src/store';
import { Provider } from'react-redux';
function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <View style={styles.container}>
      <AuthStack/>
      </View>
   </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default App;
