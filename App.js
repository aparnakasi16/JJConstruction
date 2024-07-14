import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/Navigation/StackNavigation/AuthStack';

function App() {
  return (
    <NavigationContainer>
        <View style={styles.container}>
      <AuthStack/>
      </View>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default App;
