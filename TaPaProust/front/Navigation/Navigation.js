import React from 'react'

import {View, Image,StyleSheet} from 'react-native'

import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from '../Components/MyPages/Login'
import Register from '../Components/MyPages/Register'
import Search from '../Components/MyPages/Search'
import ResultOfSearch from '../Components/MyPages/ResultOfSearch'
import BookDetails from '../Components/MyPages/BookDetails'
import AddBook from '../Components/MyPages/AddBook'
import VerifyBook from '../Components/MyPages/VerifyBook'
import UsersBooks from '../Components/MyPages/UsersBooks'
import Favorites from '../Components/MyPages/Favorites'
import Profil from '../Components/MyPages/Profil'
import ImageBrowser from '../Components/MyPages/ImageBrowser'
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

const HomeStackNavigator = createStackNavigator()

function MyHomeStackNavigator(){
  return(
    <HomeStackNavigator.Navigator
    screenOptions={{ headerShown: false}}>
      <HomeStackNavigator.Screen
        name = "Login" component={Login}/>
      <HomeStackNavigator.Screen
        name = "Home"  component={MyBooksTabNavigator}/>
      <HomeStackNavigator.Screen
        name = "Inscription"  component={Register}/>
    </HomeStackNavigator.Navigator>
  )
}
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

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
        name = "Détails du livre" component={BookDetails}/>
    </SearchStackNavigator.Navigator>
  )
}
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
const AddBookStackNavigator = createStackNavigator()

function MyAddBookStackNavigator(){
  return(
    <AddBookStackNavigator.Navigator
      initialRouteName = {'Ajouter un livre'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <AddBookStackNavigator.Screen
        name = "Ajouter un livre" component={AddBook}/>
      <AddBookStackNavigator.Screen
        name='ImageBrowser' component={ImageBrowser}
          options={{ title: '0 photo choisie'}}/>
      <AddBookStackNavigator.Screen
        name = "Vérification" component={VerifyBook}/>
    </AddBookStackNavigator.Navigator>
  )
}

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
const UsersBooksStackNavigator = createStackNavigator()

function MyUsersBooksStackNavigator(){
  return(
    <UsersBooksStackNavigator.Navigator
      initialRouteName = {'Mes livres'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <UsersBooksStackNavigator.Screen
        name = "Mes livres" component={UsersBooks}/>
      <UsersBooksStackNavigator.Screen
        name = "Détails du livre" component={BookDetails}/>
      <UsersBooksStackNavigator.Screen
        name = "Modifier un livre" component={AddBook}/>
      <UsersBooksStackNavigator.Screen
        name = "Vérification" component={VerifyBook}/>
    </UsersBooksStackNavigator.Navigator>
  )
}

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
const FavoritesStackNavigator = createStackNavigator()

function MyFavoritesStackNavigator(){
  return(
    <FavoritesStackNavigator.Navigator
      initialRouteName = {'Mes favoris'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <FavoritesStackNavigator.Screen
        name = "Mes favoris" component={Favorites}/>
      <FavoritesStackNavigator.Screen
        name = "Détail du livre" component={BookDetails}/>
    </FavoritesStackNavigator.Navigator>
  )
}

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
const ProfileStackNavigator = createStackNavigator()

function MyProfileStackNavigator(){
  return(
    <ProfileStackNavigator.Navigator
      initialRouteName = {'Mon Profil'}
      options = {{headerTitleStyle : {fontSize : 30}}}>
      <ProfileStackNavigator.Screen
        name = "Mon Profil" component={Profil}/>
    </ProfileStackNavigator.Navigator>
  )
}

/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

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
      <BooksTabNavigator.Screen name = "Mes Livres" component={MyUsersBooksStackNavigator}
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
      <BooksTabNavigator.Screen name = "Mes favoris" component={MyFavoritesStackNavigator}
       options= {{
        tabBarIcon : () => (
          <View>
            <Image
              resizeMode = 'contain'
              style={styles.favorite_image}
              source={require('../Images/favori_inv.png')}/>
          </View>
          )
        }}
      />
      <BooksTabNavigator.Screen name = "Mon profil" component={MyProfileStackNavigator}
       options= {{
        tabBarIcon : () => (
          <View>
            <Image
              resizeMode = 'contain'
              style={styles.favorite_image}
              source={require('../Images/user_inv.png')}/>
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

export default MyHomeStackNavigator
