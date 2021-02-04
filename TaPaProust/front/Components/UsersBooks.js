import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

import BookList from './BookList'
import books from '../Helpers/books'
import {screens} from '../Helpers/global'
import API from '../API/BooksAPI'

class UsersBooks extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isLoading : false,
      data : {}
    }
  }
  componentDidMount() {
    this._getMyBooks()
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  async _getMyBooks(){
    this.setState({
      isLoading : true
    })
    await API.getMyBooks().then((response) =>{
      this.setState({
        data: response.data,
        isLoading : false
      })
    })
    return this.state.data
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.USERS_BOOK})
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

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this.state.data}
          displayDetailForBook = {this._displayDetailForBook}/>
          {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -20,
    bottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'white',
    opacity : 0.5
  },
})

export default UsersBooks
