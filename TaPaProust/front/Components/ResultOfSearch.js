import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import BookItem from './BookItem'
import BookList from './BookList'
import * as Font from 'expo-font'

import screens from '../Helpers/global'


class ResultOfSearch extends React.Component{
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détail du livre', { book : book, screen : screens.RESULT_OF_SEARCH})
  }

  _displayHeader(){
      return (
        <View style = {styles.header_container}>
          <Text style = {styles.header_title}>Recherche pour : </Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{this.props.route.params.title}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{this.props.route.params.author}</Text>
          <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{this.props.route.params.edition}</Text>
        </View>
      )
  }

  render(){
    return (
      <View style={styles.main_container}>
        {this._displayHeader()}
        <BookList
          books = {this.props.route.params.books}
          displayDetailForBook = {this._displayDetailForBook}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  header_container : {
    alignItems : 'center',
    margin :5
  },
  header_title :{
    fontFamily : 'lobster-regular',
    fontSize : 32
  },
  entry_text : {
    fontFamily : 'lobster-regular'
  },
  text : {
    fontFamily : 'dancing-regular',
    fontSize : 20,
  }
})

export default ResultOfSearch
