import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import * as Font from 'expo-font'

import BookItem from '../MyCustomComponents/BookItem'
import BookList from '../MyCustomComponents/BookList'

import {screens} from '../../Helpers/global'


class ResultOfSearch extends React.Component{
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.RESULT_OF_SEARCH})
  }

  _displayHeader(){
      return (
        <View style = {styles.header_container}>
          <Text style = {styles.header_title}>Recherche pour : </Text>
          <Text style = {this.props.route.params.title ? styles.text : styles.no_entry}>
            <Text style = {styles.entry_text}>Title: </Text>
            {this.props.route.params.title? this.props.route.params.title:"Tous"}</Text>
          <Text style = {this.props.route.params.author ? styles.text : styles.no_entry}>
            <Text style = {styles.entry_text}>Author: </Text>
              {this.props.route.params.author?this.props.route.params.author:"Tous"}</Text>
          <Text style = {this.props.route.params.edition ? styles.text : styles.no_entry}>
            <Text style = {styles.entry_text}>Edition: </Text>
              {this.props.route.params.edition?this.props.route.params.edition:"Tous"}</Text>
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
    margin :5,
    paddingLeft : 5
  },
  header_title :{
    fontFamily : 'lobster-regular',
    fontSize : 32
  },
  entry_text : {
    fontFamily : 'dancing-regular',
    fontSize : 20
  },
  no_entry : {
    fontFamily : 'LobsterTwo-Italic',
    fontSize : 17,
    paddingLeft : 30
  },
  text : {
    fontFamily : 'LobsterTwo-Italic',
    fontSize : 27,
    paddingLeft : 30
  }
})

export default ResultOfSearch
