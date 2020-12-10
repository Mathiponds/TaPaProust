import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//import Search from "./Components/Search"
import Navigation from './Navigation/Navigation'
import Test from './Helpers/Test'
import getBooks from './API/BooksAPI'

export default function App() {
  return (
    <Test/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
