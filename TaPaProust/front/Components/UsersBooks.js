import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from './BookList'
import books from '../Helpers/books'
import {screens} from '../Helpers/global'

class UsersBooks extends React.Component {
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _getMyBooks(){
    return books
    //return API._getMyBooks
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détail du livre', { book : book, lastScreen : screens.USERS_BOOK})
  }
  render(){
    return(
      <View style={styles.main_container}>

        <BookList
          books = {books}
          displayDetailForBook = {this._displayDetailForBook}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default UsersBooks
