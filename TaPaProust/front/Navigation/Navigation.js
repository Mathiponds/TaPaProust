import React from 'react'

import {View, Image,StyleSheet} from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import ResultOfSearch from '../Components/ResultOfSearch'
import BookDetails from '../Components/BookDetails'
import AddBook from '../Components/AddBook'
import VerifyBook from '../Components/VerifyBook'
import UsersBooks from '../Components/UsersBooks'

const SearchStackNavigator = createStackNavigator()

function MySearchStackNavigator(){
  return(
    <SearchStackNavigator.Navigator
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <SearchStackNavigator.Screen
        name = "Recherche"  component={Search}/>
      <SearchStackNavigator.Screen
        name = "Résultat" component={ResultOfSearch}/>
      <SearchStackNavigator.Screen
        name = "Détail du livre" component={BookDetails}/>
    </SearchStackNavigator.Navigator>
  )
}

const AddBookStackNavigator = createStackNavigator()

function MyAddBookStackNavigator(){
  return(
    <AddBookStackNavigator.Navigator
      initialRouteName = {'Ajouter un livre'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <AddBookStackNavigator.Screen
        name = "Ajouter un livre" component={AddBook}/>
      <AddBookStackNavigator.Screen
        name = "Vérification" component={VerifyBook}/>
    </AddBookStackNavigator.Navigator>
  )
}

const BooksStackNavigator = createStackNavigator()

function MyBooksStackNavigator(){
  return(
    <BooksStackNavigator.Navigator
      initialRouteName = {'Mes livres'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <BooksStackNavigator.Screen
        name = "Mes livres" component={UsersBooks}/>
      <BooksStackNavigator.Screen
        name = "Détail du livre" component={BookDetails}/>
    </BooksStackNavigator.Navigator>
  )
}

const BooksTabNavigator = createBottomTabNavigator()

function MyBooksTabNavigator(){
  return (
    <BooksTabNavigator.Navigator tabBarOptions={{
        activeBackgroundColor : '#000000',
        inactiveBackgroundColor : '#000000',
        labelStyle : {
          color : '#ffffff'
        }
      }}>
      <BooksTabNavigator.Screen name = "Recherche" component={MySearchStackNavigator}
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
      <BooksTabNavigator.Screen name = "Ajouter un livre" component={MyAddBookStackNavigator}
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
      <BooksTabNavigator.Screen name = "Mes Livres" component={MyBooksStackNavigator}
       options= {{
        tabBarIcon : () => (
          <View>
            <Image
              resizeMode = 'contain'
              style={styles.favorite_image}
              source={require('../Images/user_book_inv.png')}/>
          </View>
          )
        }}
      />
    </BooksTabNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  favorite_image : {
    margin : 10,
    height : 35
  }
})

export default MyBooksTabNavigator
