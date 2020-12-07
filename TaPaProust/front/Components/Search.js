import React from 'react'
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity,ActivityIndicator} from 'react-native'
import * as Font from 'expo-font'

import MyTextInput from './MyTextInput'
import MyButton from './MyButton'
import books from '../Helpers/books'
import {inputs} from '../Helpers/global.js'

class Search extends React.Component{
  constructor(props){
      super(props)
      this.searched_title = ""
      this.searched_author = ""
      this.searched_edition = ""

      this._searchBooks = this._searchBooks.bind(this)
      this._onChangedInput = this._onChangedInput.bind(this)

      this.state = {
        assetsLoaded: false,
      };
  }

  async componentDidMount() {
        await Font.loadAsync({
            'lobster-regular': require('../assets/fonts/Lobster-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-bold' : require('../assets/fonts/DancingScript-Bold.ttf')
        });
        await Font.loadAsync({
            'dancing-medium' : require('../assets/fonts/DancingScript-Medium.ttf')
        });
        await Font.loadAsync({
            'dancing-regular' : require('../assets/fonts/DancingScript-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-semibold' : require('../assets/fonts/DancingScript-SemiBold.ttf')
        });
        this.props.navigation.setOptions({headerTitleStyle : {
          fontFamily : 'lobster-regular', fontSize : 30}})
        this.setState({ assetsLoaded: true });
    }

  _onChangedInput(text, input){
    switch(input){
      case inputs.TITLE :
        this.searched_title = text
        break;
      case inputs.AUTHOR :
        this.searched_author = text
        break;
      case inputs.EDITION :
        this.search_edition = text
        break;
    }
  }

  _searchBooks(){
    this.props.navigation.navigate('Résultat', {books : books, title : this.searched_title,
    author : this.searched_author, edition : this.search_edition})
    //this.props.navigation.navigate('BookList', {books :
    //getBooksFromApi(this.searched_title,this.searched_author,this.search_edition)})
  }
  _displayLoading() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  _searchedItemBox(){
    return (
      <View style = { styles.search_item_container}>
        <MyTextInput
          title = {'Titre'} placeholder = {'Titre'} input = {inputs.TITLE}
          onChangedInput = {this._onChangedInput}
          />
        <MyTextInput
          title = {'Auteur'} placeholder = {'Auteur'} input = {inputs.AUTHOR}
          onChangedInput = {this._onChangedInput}
          />
        <MyTextInput
          title = {'Edition'} placeholder = {'Edition'} input = {inputs.EDITION}
          onChangedInput = {this._onChangedInput}
          />
        <MyButton
          onPress = {this._searchBooks}
          title = {'Rechercher'}/>
      </View>
    )
  }

  render(){
    if(this.state.assetsLoaded) {
    return (
      <View style = {styles.main_container}>
        <View style = { styles.title_box}>
          <Text style = {styles.title}>
            TaPaProust
          </Text>
        </View>
        {this._searchedItemBox()}

      </View>
    )
  }else {
    return this._displayLoading()
  }
  }

}

const styles = StyleSheet.create({
  main_container : {
    margin : 20,
    flex : 1
  },
  title_box : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
  },
  title : {
    fontSize : 55,
    fontFamily : 'lobster-regular',
  },
  search_item_container : {
    flex : 5,
    margin : 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'white',
    opacity : 0.5
  }
})

export default Search
