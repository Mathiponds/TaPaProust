import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import BookItem from './BookItem'


class BookList extends React.Component{

  render(){
    console.log(this.props.books)
    return (
      <FlatList
        style={styles.list}
        data={this.props.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem = {({item}) => (
          <BookItem
            book = {item}
            displayDetailForBook = {this.props.displayDetailForBook}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

export default BookList
