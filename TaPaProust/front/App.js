import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/MyPages/Login'
import Store from './Store/configureStore'
import { Provider } from 'react-redux'

//import Search from "./Components/Search"
import Navigation from './Navigation/Navigation'

export default function App() {
  return (
    <Provider store = {Store}>
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
