import React from 'react'

import {View, Image,StyleSheet} from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import BookList from '../Components/BookList'
import BookDetails from '../Components/BookDetails'

const SearchStackNavigator = createStackNavigator()

function MySearchStackNavigator(){
  return(
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen name = "Recherche" component={Search}/>
      <SearchStackNavigator.Screen name = "Résultat" component={BookList}/>
      <SearchStackNavigator.Screen name = "Détail du livre" component={BookDetails}/>
    </SearchStackNavigator.Navigator>
  )
}
const styles = StyleSheet.create({

})
export default MySearchStackNavigator
