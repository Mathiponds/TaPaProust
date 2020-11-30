import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import BookItem from './BookItem'


class BookList extends React.Component{

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détail du livre', { book : book})
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

  _displayListBooks(){
    return (
      <FlatList
        style={styles.list}
        data={this.props.route.params.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem = {({item}) => (
          <BookItem
            book = {item}
            displayDetailForBook = {this._displayDetailForBook}
          />
        )}
      />
    )
  }

  render(){
    return (
      <View style={styles.main_container}>
        {this._displayHeader()}
        {this._displayListBooks()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  header_container : {
    alignItems : 'center',
    margin :5
  },
  header_title :{
    fontSize : 24
  },
  entry_text : {
    fontWeight : 'bold'
  },
  text : {
    fontSize : 20,
  }
})

export default BookList
