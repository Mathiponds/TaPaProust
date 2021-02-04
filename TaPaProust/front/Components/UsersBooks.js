import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from './BookList'
import MyActivityIndicator from './MyActivityIndicator'
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

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this.state.data}
          displayDetailForBook = {this._displayDetailForBook}/>
          <MyActivityIndicator condition = {this.state.isLoading}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
})

export default UsersBooks
