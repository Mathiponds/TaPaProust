import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from './BookList'
import books from '../Helpers/books'
import {screens} from '../Helpers/global'
import API from '../API/BooksAPI'

class UsersBooks extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data : {}
    }
  }
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _getMyBooks(){
    API.getAllBooks().then((response) =>{
      this.setState({
        data: response.data
      })
    })
    return this.state.data
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.USERS_BOOK})
  }

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this._getMyBooks()}
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
