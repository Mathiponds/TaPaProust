import React from 'react'

import {View, Image,StyleSheet} from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import BookList from '../Components/BookList'
import BookDetails from '../Components/BookDetails'
import AddBook from '../Components/AddBook'
import VerifyBook from '../Components/VerifyBook'

const SearchStackNavigator = createStackNavigator()

function MySearchStackNavigator(){
  return(
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen
        name = "Recherche"
        component={Search}
        options = {{headerTitleStyle : {fontSize : 30}}}/>
      <SearchStackNavigator.Screen name = "Résultat" component={BookList}/>
      <SearchStackNavigator.Screen name = "Détail du livre" component={BookDetails}
        options = {{headerTitleStyle : {fontSize : 20}}}/>
    </SearchStackNavigator.Navigator>
  )
}

const AddBookStackNavigator = createStackNavigator()

function MyAddBookStackNavigator(){
  return(
    <AddBookStackNavigator.Navigator
      initialRouteName = {'Ajouter un livre'}>
      <AddBookStackNavigator.Screen
        name = "Ajouter un livre" component={AddBook}
        options = {{headerTitleStyle : {fontSize : 30}}}/>
      <AddBookStackNavigator.Screen
        name = "Vérification" component={VerifyBook}
        options = {{headerTitleStyle : {fontSize : 30}}}/>
    </AddBookStackNavigator.Navigator>
  )
}

const MoviesTabNavigator = createBottomTabNavigator()

function MyMoviesTabNavigator(){
  return (
    <MoviesTabNavigator.Navigator tabBarOptions={{
        activeBackgroundColor : '#000000',
        inactiveBackgroundColor : '#000000',
        labelStyle : {
          color : '#ffffff'
        }
      }}>
      <MoviesTabNavigator.Screen name = "Search" component={MySearchStackNavigator}
       options= {{
        tabBarIcon : () => (
          <View>
            <Image
              resizeMode = 'contain'
              style={styles.favorite_image}
              source={require('../Images/search_inv.png')}/>
          </View>
          )
        }}
      />
      <MoviesTabNavigator.Screen name = "AddBook" component={MyAddBookStackNavigator}
      options= {{
       tabBarIcon : () => (
         <View>
            <Image
              resizeMode = 'contain'
              style={styles.favorite_image}
              source={require('../Images/add_book_inv.png')}/>
         </View>
         )
       }}
      />
    </MoviesTabNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  favorite_image : {
    margin : 10,
    height : 35
  }
})

export default MyMoviesTabNavigator
