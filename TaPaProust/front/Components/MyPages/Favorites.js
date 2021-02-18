import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from '../MyCustomComponents/BookList'

import books from '../../Helpers/books'
import {screens} from '../../Helpers/global'
import API from '../../API/BooksAPI'

class Favorites extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      favBooks : []
    }
  }
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
  }

  _getMyFavoritesBooks(){
    return API.getMyFavBooks().then(response => this.setState({
      favBooks : response.data
    })).catch(error => console.log(error))
  }

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.FAVORITES})
  }

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this._getMyFavoritesBooks()}
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

export default Favorites
