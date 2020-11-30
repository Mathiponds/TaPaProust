import React from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import books from '../Helpers/books'

class Search extends React.Component{
  constructor(props){
      super(props)
      this.searched_title = ""
      this.searched_author = ""
      this.searched_edition = ""

      this._searchBooks = this._searchBooks.bind(this)
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

  render(){
    return (
      <View style = {styles.main_container}>
        <View style = { styles.title_box}>
          <Text style = {styles.title}>
            TaPaProust
          </Text>
        </View>

        <View style = { styles.search_item_container}>
          <View style = { styles.search_item_box}>
            <Text style = {styles.search_item_text}>
              Titre
            </Text>
            <TextInput
              style = {styles.text_input}
              placeholder = 'Titre'
              onChangeText = {(text) => this._onChangedInput(text, inputs.TITLE)}
              >
            </TextInput>
          </View>
          <View style = { styles.search_item_box}>
            <Text style = {styles.search_item_text}>
              Auteur
            </Text>
            <TextInput
              style = {styles.text_input}
              placeholder = 'Auteur'
              onChangeText = {(text) => this._onChangedInput(text, inputs.AUTHOR)}>
            </TextInput>
          </View>
          <View style = { styles.search_item_box}>
            <Text style = {styles.search_item_text}>
              Edition
            </Text>
            <TextInput
              style = {styles.text_input}
              placeholder = 'Edition'
              onChangeText = {(text) => this._onChangedInput(text, inputs.EDITION)}>
            </TextInput>
          </View>
          <View style = { styles.button_box}>
            <Button
              style = {styles.button}
              title = {"Rechercher"}
              onPress = {() => {this._searchBooks()}}>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
const inputs = {
  TITLE : 'title',
  AUTHOR : 'author',
  EDITION : 'edition'
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
    fontSize : 35,
    fontFamily : 'Lobster-Regular'
  },
  search_item_container : {
    flex : 4,
    margin : 10
  },
  search_item_box : {
    height : 100
  },
  search_item_text : {
    fontSize : 25,
    marginBottom : 5
  },
  text_input : {
    height : 40,
    paddingLeft: 5,
    borderColor: '#000000',
    borderWidth: 1,
  },
  button_box : {
    flex :1
  },
  button: {

  }
})

export default Search
