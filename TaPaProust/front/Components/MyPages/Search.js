import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'
import update from 'react-addons-update'

import MyTextInput from '../MyCustomComponents/MyTextInput'
import MyButton from '../MyCustomComponents/MyButton'
import {inputs} from '../../Helpers/global.js'
import API from '../../API/BooksAPI'
import MyActivityIndicator from '../MyCustomComponents/MyActivityIndicator'

class Search extends React.Component{
  constructor(props){
      super(props)
      this.searched_title = ""
      this.searched_author = ""
      this.searched_edition = ""


      this._searchBooks = this._searchBooks.bind(this)
      this._onChangedInput = this._onChangedInput.bind(this)
      this._focusNext = this._focusNext.bind(this)

      this.state = {
        isLoading : false,
        areAllEntriesNull : false,
        toFocus : [false, false, false]
      }
  }

  componentDidMount() {
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

  async _searchBooks(){
    this.setState({
      isLoading :true
    })
    if(this.searched_title === "" && this.searched_author === "" && this.searched_edition === ""){
      this.setState({
        isLoading : false,
        areAllEntriesNull : true
      })
    }else{
      await API.getBooks(this.searched_title, this.searched_author, this.search_edition)
        .then((response)=>{
          this.setState({
            data : response.data,
            isLoading : false
        })
      })
     this.props.navigation.navigate('Résultat', {books : this.state.data, title : this.searched_title,
     author : this.searched_author, edition : this.search_edition})
   }
  }

  _getCommentAllEntriesNull(){
    if(this.state.areAllEntriesNull){
      return (
        <View>
          <Text style = {styles.nullEntry}>Au moins une entrée ne doit pas être nul</Text>
        </View>
      )
    }
  }

  async _focusNext(fromTextInput){
    const toFocus = [...this.state.toFocus]
    toFocus[fromTextInput] = false
    toFocus[fromTextInput+1] = true
    await this.setState({
      toFocus : toFocus
    })
    console.log(this.state.toFocus)
  }

  _searchedItemBox(){
    return (
      <View style = { styles.search_item_container}>
        <MyTextInput
          title = {'Titre'} placeholder = {'Titre'} input = {inputs.TITLE}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          returnKeyType = {"next"} onSubmitEditing = {() => this._focusNext(0)}
          focus = {this.state.toFocus[0]}
          />
        <MyTextInput
          title = {'Auteur'} placeholder = {'Auteur'} input = {inputs.AUTHOR}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          returnKeyType = {"next"} onSubmitEditing = {() => this._focusNext(1)}
          focus = {this.state.toFocus[1]}
          />
        <MyTextInput
          title = {'Edition'} placeholder = {'Edition'} input = {inputs.EDITION}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          returnKeyType = {"search"} onSubmitEditing = {() => this._searchBooks}
          focus = {this.state.toFocus[2]}
          />
          {this._getCommentAllEntriesNull()}
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
          <MyActivityIndicator condition = {this.state.isLoading}/>
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
  nullEntry : {
    color : '#ff0000'
  }
})

export default Search
