import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity,ActivityIndicator} from 'react-native'
import * as Font from 'expo-font'

import MyTextInput from './MyTextInput'
import MyButton from './MyButton'
import {inputs} from '../Helpers/global.js'
import API from '../API/BooksAPI'

class Search extends React.Component{
  constructor(props){
      super(props)
      this.searched_title = ""
      this.searched_author = ""
      this.searched_edition = ""


      this._searchBooks = this._searchBooks.bind(this)
      this._onChangedInput = this._onChangedInput.bind(this)

      this.state = {
        isLoading : false
      }
  }

  async componentDidMount() {
        this.props.navigation.setOptions({headerTitleStyle : {
          fontFamily : 'lobster-regular', fontSize : 30}})
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

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }
  }

  async _searchBooks(){
    this.setState({
      isLoading :true
    })
    await API.getBooks(this.searched_title, this.searched_author, this.search_edition)
      .then((response)=>{
        this.setState({
          data : response.data,
          isLoading : false
      })
      .catch((error) => {
          console.log(error)
      })
    })
     this.props.navigation.navigate('Résultat', {books : this.state.data, title : this.searched_title,
     author : this.searched_author, edition : this.search_edition})
  }

  _searchedItemBox(){
    return (
      <View style = { styles.search_item_container}>
        <MyTextInput
          title = {'Titre'} placeholder = {'Titre'} input = {inputs.TITLE}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          />
        <MyTextInput
          title = {'Auteur'} placeholder = {'Auteur'} input = {inputs.AUTHOR}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          />
        <MyTextInput
          title = {'Edition'} placeholder = {'Edition'} input = {inputs.EDITION}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          />
        <MyButton
          onPress = {this._searchBooks}
          title = {'Rechercher'}/>
      </View>
    )
  }

  render(){
      return (
        <View style = {styles.main_container}>
          <View style = { styles.title_box}>
            <Text style = {styles.title}>
              TaPaProust
            </Text>
          </View>
          {this._searchedItemBox()}
          {this._displayLoading()}
        </View>
      )
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
