import React from 'react'
import {View, StyleSheet} from 'react-native'

import BookList from '../MyCustomComponents/BookList'

import books from '../../Helpers/books'
import {screens} from '../../Helpers/global'
import API from '../../API/BooksAPI'

import {connect} from 'react-redux'

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

  _displayDetailForBook = (book) => {
    this.props.navigation.navigate('Détails du livre', { book : book, lastScreen : screens.FAVORITES})
  }

  render(){
    return(
      <View style={styles.main_container}>
        <BookList
          books = {this.props.favoritesBook}
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

const mapStateToProps = (state) => {
  return {
    favoritesBook: state.toggleFavorite.favoritesBook
  }
}

export default connect(mapStateToProps)(Favorites)
